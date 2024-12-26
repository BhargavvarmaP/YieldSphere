// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../core/BaseContract.sol";
import "../interfaces/IPriceOracle.sol";

/**
 * @title PriceOracle
 * @dev Manages price feeds and volatility tracking
 */
contract PriceOracle is BaseContract, IPriceOracle {
    struct PriceData {
        uint256 price;
        uint256 timestamp;
        uint256 volatility;
        bool isVolatile;
    }

    // Token price data mapping
    mapping(address => PriceData) private _priceData;
    
    // Constants
    uint256 private constant PRICE_EXPIRY = 1 hours;
    uint256 private constant VOLATILITY_THRESHOLD = 1000; // 10% in basis points

    // Events
    event PriceUpdated(address indexed token, uint256 price, uint256 volatility);
    event VolatilityStatusChanged(address indexed token, bool isVolatile);

    /**
     * @dev Get the current price of a token
     */
    function getPrice(address token) external view override returns (uint256) {
        PriceData memory data = _priceData[token];
        require(data.price > 0, "Price not available");
        require(
            block.timestamp - data.timestamp <= PRICE_EXPIRY,
            "Price expired"
        );
        return data.price;
    }

    /**
     * @dev Update the price of a token
     */
    function updatePrice(
        address token,
        uint256 newPrice
    ) external override onlyRole(OPERATOR_ROLE) whenNotPaused {
        require(newPrice > 0, "Invalid price");
        
        PriceData storage data = _priceData[token];
        uint256 oldPrice = data.price;
        
        // Update price data
        data.price = newPrice;
        data.timestamp = block.timestamp;
        
        // Calculate volatility if old price exists
        if (oldPrice > 0) {
            uint256 priceDiff = oldPrice > newPrice ? 
                oldPrice - newPrice : 
                newPrice - oldPrice;
            
            uint256 volatility = (priceDiff * 10000) / oldPrice; // In basis points
            data.volatility = volatility;
            
            // Update volatility status
            bool wasVolatile = data.isVolatile;
            data.isVolatile = volatility >= VOLATILITY_THRESHOLD;
            
            if (wasVolatile != data.isVolatile) {
                emit VolatilityStatusChanged(token, data.isVolatile);
            }
        }
        
        emit PriceUpdated(token, newPrice, data.volatility);
    }

    /**
     * @dev Check if a token is considered volatile
     */
    function isVolatile(address token) external view override returns (bool) {
        return _priceData[token].isVolatile;
    }
}