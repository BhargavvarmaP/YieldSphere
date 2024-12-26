// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Constants
 * @dev Library containing constant values used across the protocol
 */
library Constants {
    // Contract Types
    bytes32 public constant LOW_RISK_INDEX = keccak256("LOW_RISK_INDEX");
    bytes32 public constant MEDIUM_RISK_INDEX = keccak256("MEDIUM_RISK_INDEX");
    bytes32 public constant HIGH_RISK_INDEX = keccak256("HIGH_RISK_INDEX");
    bytes32 public constant DEX_LIQUIDITY_PROVIDER = keccak256("DEX_LIQUIDITY_PROVIDER");
    bytes32 public constant TRADING_FEE_COLLECTOR = keccak256("TRADING_FEE_COLLECTOR");
    bytes32 public constant DYNAMIC_REBALANCER = keccak256("DYNAMIC_REBALANCER");
    bytes32 public constant YIELD_OPTIMIZER = keccak256("YIELD_OPTIMIZER");
    bytes32 public constant MULTI_SIG_WALLET = keccak256("MULTI_SIG_WALLET");
    bytes32 public constant USER_REGISTRY = keccak256("USER_REGISTRY");
    bytes32 public constant PORTFOLIO_MANAGER = keccak256("PORTFOLIO_MANAGER");
    
    // Protocol Parameters
    uint256 public constant MAX_TOKENS_PER_INDEX = 20;
    uint256 public constant MIN_TOKENS_PER_INDEX = 2;
    uint256 public constant REBALANCE_THRESHOLD = 5; // 5% deviation triggers rebalance
    uint256 public constant MAX_SLIPPAGE = 100; // 1% max slippage
    uint256 public constant EMERGENCY_WITHDRAWAL_DELAY = 24 hours;
}