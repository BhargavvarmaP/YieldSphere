// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IFeeCollector
 * @dev Interface for fee collection operations
 */
interface IFeeCollector {
    struct FeeConfig {
        uint256 tradingFee;
        uint256 managementFee;
        uint256 performanceFee;
    }

    function collectFees(address token, uint256 amount) external returns (uint256);
    function distributeFees(address[] calldata recipients, uint256[] calldata shares) external;
    function updateFeeConfig(FeeConfig calldata newConfig) external;
}