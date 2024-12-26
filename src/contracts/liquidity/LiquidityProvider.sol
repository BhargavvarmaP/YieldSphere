// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../core/BaseContract.sol";
import "../interfaces/ILiquidityProvider.sol";
import "../libraries/TokenUtils.sol";

/**
 * @title LiquidityProvider
 * @dev Manages liquidity provision across different DEXs
 */
contract LiquidityProvider is BaseContract, ILiquidityProvider {
    // Pool mapping: keccak256(abi.encodePacked(token0, token1)) => LiquidityPool
    mapping(bytes32 => LiquidityPool) private _pools;
    
    // Events
    event LiquidityAdded(
        address indexed token0,
        address indexed token1,
        uint256 amount0,
        uint256 amount1,
        uint256 liquidity
    );
    
    event LiquidityRemoved(
        address indexed token0,
        address indexed token1,
        uint256 amount0,
        uint256 amount1,
        uint256 liquidity
    );

    /**
     * @dev Add liquidity to a pool
     */
    function addLiquidity(
        address token0,
        address token1,
        uint256 amount0,
        uint256 amount1
    ) external override onlyRole(OPERATOR_ROLE) whenNotPaused returns (uint256) {
        require(token0 < token1, "LP: Invalid token order");
        bytes32 poolId = _getPoolId(token0, token1);
        
        // Transfer tokens from sender
        TokenUtils.safeTransferFrom(token0, msg.sender, address(this), amount0);
        TokenUtils.safeTransferFrom(token1, msg.sender, address(this), amount1);
        
        // Update pool
        LiquidityPool storage pool = _pools[poolId];
        if (!pool.isActive) {
            pool.token0 = token0;
            pool.token1 = token1;
            pool.isActive = true;
        }
        
        pool.reserve0 += amount0;
        pool.reserve1 += amount1;
        
        uint256 liquidity = _calculateLiquidity(amount0, amount1);
        emit LiquidityAdded(token0, token1, amount0, amount1, liquidity);
        
        return liquidity;
    }

    /**
     * @dev Remove liquidity from a pool
     */
    function removeLiquidity(
        address token0,
        address token1,
        uint256 liquidity
    ) external override onlyRole(OPERATOR_ROLE) whenNotPaused returns (uint256, uint256) {
        require(token0 < token1, "LP: Invalid token order");
        bytes32 poolId = _getPoolId(token0, token1);
        LiquidityPool storage pool = _pools[poolId];
        require(pool.isActive, "LP: Pool not active");
        
        // Calculate amounts to return
        uint256 amount0 = (liquidity * pool.reserve0) / _getTotalLiquidity(pool);
        uint256 amount1 = (liquidity * pool.reserve1) / _getTotalLiquidity(pool);
        
        // Update pool
        pool.reserve0 -= amount0;
        pool.reserve1 -= amount1;
        
        // Transfer tokens to sender
        TokenUtils.safeTransfer(token0, msg.sender, amount0);
        TokenUtils.safeTransfer(token1, msg.sender, amount1);
        
        emit LiquidityRemoved(token0, token1, amount0, amount1, liquidity);
        
        return (amount0, amount1);
    }

    /**
     * @dev Get pool information
     */
    function getPoolInfo(address token0, address token1) 
        external 
        view 
        override 
        returns (LiquidityPool memory) 
    {
        require(token0 < token1, "LP: Invalid token order");
        return _pools[_getPoolId(token0, token1)];
    }

    /**
     * @dev Calculate pool identifier
     */
    function _getPoolId(address token0, address token1) private pure returns (bytes32) {
        return keccak256(abi.encodePacked(token0, token1));
    }

    /**
     * @dev Calculate liquidity tokens to mint
     */
    function _calculateLiquidity(uint256 amount0, uint256 amount1) private pure returns (uint256) {
        return Math.sqrt(amount0 * amount1);
    }

    /**
     * @dev Get total liquidity in a pool
     */
    function _getTotalLiquidity(LiquidityPool storage pool) private view returns (uint256) {
        return _calculateLiquidity(pool.reserve0, pool.reserve1);
    }
}