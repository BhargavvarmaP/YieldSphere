// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title TokenUtils
 * @dev Utility functions for token operations
 */
library TokenUtils {
    function safeTransfer(
        address token,
        address to,
        uint256 amount
    ) internal {
        require(token != address(0), "Invalid token address");
        require(to != address(0), "Invalid recipient");
        
        (bool success, bytes memory data) = token.call(
            abi.encodeWithSelector(IERC20.transfer.selector, to, amount)
        );
        require(success && (data.length == 0 || abi.decode(data, (bool))),
            "Token transfer failed"
        );
    }

    function safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 amount
    ) internal {
        require(token != address(0), "Invalid token address");
        require(from != address(0), "Invalid sender");
        require(to != address(0), "Invalid recipient");
        
        (bool success, bytes memory data) = token.call(
            abi.encodeWithSelector(IERC20.transferFrom.selector, from, to, amount)
        );
        require(success && (data.length == 0 || abi.decode(data, (bool))),
            "Token transferFrom failed"
        );
    }
}