// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IIndexToken
 * @dev Interface for Index Token contracts
 */
interface IIndexToken {
    struct TokenInfo {
        address token;
        uint256 weight;
        bool isActive;
    }

    function initialize(
        address registry,
        address admin,
        string memory name,
        string memory symbol
    ) external;
    
    function addToken(address token, uint256 weight) external;
    function removeToken(address token) external;
    function updateTokenWeight(address token, uint256 newWeight) external;
    function rebalance() external;
    function getTokens() external view returns (address[] memory);
    function getTokenWeight(address token) external view returns (uint256);
}