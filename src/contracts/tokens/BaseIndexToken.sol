// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "../core/BaseContract.sol";
import "../interfaces/IIndexToken.sol";
import "../libraries/Constants.sol";

/**
 * @title BaseIndexToken
 * @dev Base contract for all index tokens
 */
abstract contract BaseIndexToken is BaseContract, ERC20Upgradeable, IIndexToken {
    // Token management
    mapping(address => TokenInfo) public tokens;
    address[] public tokenList;
    uint256 public totalWeight;

    // Events
    event TokenAdded(address indexed token, uint256 weight);
    event TokenRemoved(address indexed token);
    event TokenWeightUpdated(address indexed token, uint256 oldWeight, uint256 newWeight);
    event Rebalanced();

    /**
     * @dev Initialize the index token
     */
    function initialize(
        address _registry,
        address admin,
        string memory name,
        string memory symbol
    ) public virtual override initializer {
        __BaseContract_init(_registry, admin);
        __ERC20_init(name, symbol);
    }

    /**
     * @dev Add a token to the index
     */
    function addToken(address token, uint256 weight) 
        external 
        virtual 
        override 
        onlyRole(OPERATOR_ROLE) 
        whenNotPaused 
    {
        require(token != address(0), "Invalid token address");
        require(weight > 0, "Weight must be positive");
        require(!tokens[token].isActive, "Token already exists");
        require(tokenList.length < Constants.MAX_TOKENS_PER_INDEX, "Max tokens reached");

        tokens[token] = TokenInfo({
            token: token,
            weight: weight,
            isActive: true
        });
        tokenList.push(token);
        totalWeight += weight;

        emit TokenAdded(token, weight);
    }

    /**
     * @dev Remove a token from the index
     */
    function removeToken(address token)
        external
        virtual
        override
        onlyRole(OPERATOR_ROLE)
        whenNotPaused
    {
        require(tokens[token].isActive, "Token not found");
        require(tokenList.length > Constants.MIN_TOKENS_PER_INDEX, "Minimum tokens required");

        totalWeight -= tokens[token].weight;
        tokens[token].isActive = false;
        
        // Remove from tokenList
        for (uint256 i = 0; i < tokenList.length; i++) {
            if (tokenList[i] == token) {
                tokenList[i] = tokenList[tokenList.length - 1];
                tokenList.pop();
                break;
            }
        }

        emit TokenRemoved(token);
    }

    /**
     * @dev Update token weight
     */
    function updateTokenWeight(address token, uint256 newWeight)
        external
        virtual
        override
        onlyRole(OPERATOR_ROLE)
        whenNotPaused
    {
        require(tokens[token].isActive, "Token not found");
        require(newWeight > 0, "Weight must be positive");

        uint256 oldWeight = tokens[token].weight;
        totalWeight = totalWeight - oldWeight + newWeight;
        tokens[token].weight = newWeight;

        emit TokenWeightUpdated(token, oldWeight, newWeight);
    }

    /**
     * @dev Get list of tokens
     */
    function getTokens() external view override returns (address[] memory) {
        return tokenList;
    }

    /**
     * @dev Get token weight
     */
    function getTokenWeight(address token) external view override returns (uint256) {
        require(tokens[token].isActive, "Token not found");
        return tokens[token].weight;
    }

    /**
     * @dev Rebalance the index
     * To be implemented by specific index types
     */
    function rebalance() external virtual override;
}