// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./BaseIndexToken.sol";

/**
 * @title MediumRiskIndex
 * @dev Implementation of medium-risk index token
 */
contract MediumRiskIndex is BaseIndexToken {
    uint256 private constant MAX_VOLATILE_ALLOCATION = 50; // 50% max allocation to volatile assets
    
    function rebalance() external override onlyRole(OPERATOR_ROLE) whenNotPaused {
        // Implementation specific to medium-risk strategy
        emit Rebalanced();
    }
}