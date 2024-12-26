// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../core/BaseContract.sol";
import "../interfaces/IRebalancer.sol";
import "../interfaces/IPriceOracle.sol";
import "../libraries/Constants.sol";

/**
 * @title BaseRebalancer
 * @dev Base contract for rebalancing operations
 */
abstract contract BaseRebalancer is BaseContract, IRebalancer {
    // Price Oracle interface
    IPriceOracle public priceOracle;
    
    // Events
    event RebalanceInitiated(address indexed indexToken);
    event RebalanceCompleted(address indexed indexToken);
    
    /**
     * @dev Initialize the rebalancer
     */
    function initialize(
        address _registry,
        address _priceOracle,
        address admin
    ) public virtual initializer {
        __BaseContract_init(_registry, admin);
        priceOracle = IPriceOracle(_priceOracle);
    }

    /**
     * @dev Check if rebalancing is needed
     */
    function checkRebalanceNeeded(address indexToken) 
        public 
        view 
        virtual 
        override 
        returns (bool) 
    {
        return _checkDeviation(indexToken) > Constants.REBALANCE_THRESHOLD;
    }

    /**
     * @dev Calculate current portfolio deviation
     */
    function _checkDeviation(address indexToken) internal view returns (uint256) {
        // Implementation will vary by rebalancer type
        return 0;
    }

    /**
     * @dev Calculate optimal weights
     * To be implemented by specific rebalancer types
     */
    function getOptimalWeights(address indexToken) 
        external 
        view 
        virtual 
        override 
        returns (uint256[] memory);
}