// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ILiquidityProvider
 * @dev Interface for liquidity provision operations
 */
interface ILiquidityProvider {
    struct LiquidityPool {
        address token0;
        address token1;
        uint256 reserve0;
        uint256 reserve1;
        bool isActive;
    }

    function addLiquidity(
        address token0,
        address token1,
        uint256 amount0,
        uint256 amount1
    ) external returns (uint256 liquidity);

    function removeLiquidity(
        address token0,
        address token1,
        uint256 liquidity
    ) external returns (uint256 amount0, uint256 amount1);

    function getPoolInfo(address token0, address token1) 
        external view returns (LiquidityPool memory);
}