// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IPriceOracle
 * @dev Interface for price oracle operations
 */
interface IPriceOracle {
    function getPrice(address token) external view returns (uint256);
    function updatePrice(address token, uint256 price) external;
    function isVolatile(address token) external view returns (bool);
}