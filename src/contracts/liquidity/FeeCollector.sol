// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../core/BaseContract.sol";
import "../interfaces/IFeeCollector.sol";
import "../libraries/TokenUtils.sol";

/**
 * @title FeeCollector
 * @dev Manages fee collection and distribution
 */
contract FeeCollector is BaseContract, IFeeCollector {
    // Fee configuration
    FeeConfig public feeConfig;
    
    // Fee accumulation
    mapping(address => uint256) public collectedFees;
    
    // Events
    event FeesCollected(address indexed token, uint256 amount);
    event FeesDistributed(address[] recipients, uint256[] amounts);
    event FeeConfigUpdated(FeeConfig newConfig);
    
    /**
     * @dev Collect fees from operations
     */
    function collectFees(address token, uint256 amount) 
        external 
        override 
        onlyRole(OPERATOR_ROLE) 
        whenNotPaused 
        returns (uint256) 
    {
        require(amount > 0, "Invalid amount");
        
        uint256 fee = (amount * feeConfig.tradingFee) / 10000;
        if (fee > 0) {
            TokenUtils.safeTransferFrom(token, msg.sender, address(this), fee);
            collectedFees[token] += fee;
            emit FeesCollected(token, fee);
        }
        
        return fee;
    }
    
    /**
     * @dev Distribute collected fees
     */
    function distributeFees(
        address[] calldata recipients,
        uint256[] calldata shares
    ) external override onlyRole(ADMIN_ROLE) whenNotPaused {
        require(recipients.length == shares.length, "Invalid parameters");
        require(recipients.length > 0, "No recipients");
        
        uint256 totalShares = 0;
        for (uint256 i = 0; i < shares.length; i++) {
            totalShares += shares[i];
        }
        require(totalShares == 10000, "Invalid shares total"); // Must total 100%
        
        emit FeesDistributed(recipients, shares);
    }
    
    /**
     * @dev Update fee configuration
     */
    function updateFeeConfig(FeeConfig calldata newConfig) 
        external 
        override 
        onlyRole(ADMIN_ROLE) 
    {
        require(
            newConfig.tradingFee + newConfig.managementFee + newConfig.performanceFee <= 3000,
            "Total fees too high"
        ); // Max 30%
        
        feeConfig = newConfig;
        emit FeeConfigUpdated(newConfig);
    }
}