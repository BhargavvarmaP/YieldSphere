// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IRebalancer
 * @dev Interface for rebalancing operations
 */
interface IRebalancer {
    struct RebalanceParams {
        address[] tokens;
        uint256[] targetWeights;
        uint256 maxSlippage;
    }

    function rebalance(RebalanceParams calldata params) external;
    function checkRebalanceNeeded(address indexToken) external view returns (bool);
    function getOptimalWeights(address indexToken) external view returns (uint256[] memory);
}