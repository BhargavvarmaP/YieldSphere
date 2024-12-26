// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/**
 * @title BaseContract
 * @dev Base contract with common functionality for all YieldSphere contracts
 */
abstract contract BaseContract is 
    Initializable, 
    AccessControlUpgradeable,
    PausableUpgradeable,
    ReentrancyGuardUpgradeable,
    UUPSUpgradeable 
{
    // Roles
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");

    // Registry address
    address public registry;

    // Events
    event RegistryUpdated(address indexed oldRegistry, address indexed newRegistry);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /**
     * @dev Initialize function to be called by proxy
     * @param _registry Address of the YieldSphere registry
     * @param admin Address of the admin
     */
    function __BaseContract_init(
        address _registry,
        address admin
    ) internal onlyInitializing {
        __AccessControl_init();
        __Pausable_init();
        __ReentrancyGuard_init();
        __UUPSUpgradeable_init();

        registry = _registry;
        
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(ADMIN_ROLE, admin);
        _grantRole(UPGRADER_ROLE, admin);
        _grantRole(OPERATOR_ROLE, admin);
    }

    /**
     * @dev Update the registry address
     * @param newRegistry New registry address
     */
    function updateRegistry(address newRegistry) external onlyRole(ADMIN_ROLE) {
        require(newRegistry != address(0), "Invalid registry address");
        address oldRegistry = registry;
        registry = newRegistry;
        emit RegistryUpdated(oldRegistry, newRegistry);
    }

    /**
     * @dev Pause the contract
     */
    function pause() external onlyRole(ADMIN_ROLE) {
        _pause();
    }

    /**
     * @dev Unpause the contract
     */
    function unpause() external onlyRole(ADMIN_ROLE) {
        _unpause();
    }

    /**
     * @dev Function that should revert when `msg.sender` is not authorized to upgrade the contract
     */
    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}