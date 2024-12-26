// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

/**
 * @title YieldSphereRegistry
 * @dev Central registry for all YieldSphere contracts and their interactions
 */
contract YieldSphereRegistry is 
    Initializable, 
    AccessControlUpgradeable, 
    PausableUpgradeable, 
    UUPSUpgradeable 
{
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    // Contract type to address mapping
    mapping(bytes32 => address) private _contracts;
    
    // Contract address to version mapping
    mapping(address => string) private _versions;
    
    // Events
    event ContractRegistered(bytes32 indexed contractType, address indexed contractAddress, string version);
    event ContractUpdated(bytes32 indexed contractType, address indexed oldAddress, address indexed newAddress);
    event ContractRemoved(bytes32 indexed contractType, address indexed contractAddress);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address admin) public initializer {
        __AccessControl_init();
        __Pausable_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(ADMIN_ROLE, admin);
        _grantRole(UPGRADER_ROLE, admin);
    }

    /**
     * @dev Register a new contract
     * @param contractType The type identifier of the contract
     * @param contractAddress The address of the contract
     * @param version The version of the contract
     */
    function registerContract(
        bytes32 contractType,
        address contractAddress,
        string calldata version
    ) external onlyRole(ADMIN_ROLE) {
        require(contractAddress != address(0), "Invalid contract address");
        require(_contracts[contractType] == address(0), "Contract type already registered");

        _contracts[contractType] = contractAddress;
        _versions[contractAddress] = version;

        emit ContractRegistered(contractType, contractAddress, version);
    }

    /**
     * @dev Update an existing contract
     * @param contractType The type identifier of the contract
     * @param newContractAddress The new address of the contract
     * @param version The version of the new contract
     */
    function updateContract(
        bytes32 contractType,
        address newContractAddress,
        string calldata version
    ) external onlyRole(ADMIN_ROLE) {
        require(newContractAddress != address(0), "Invalid contract address");
        require(_contracts[contractType] != address(0), "Contract type not registered");
        
        address oldAddress = _contracts[contractType];
        _contracts[contractType] = newContractAddress;
        _versions[newContractAddress] = version;

        emit ContractUpdated(contractType, oldAddress, newContractAddress);
    }

    /**
     * @dev Remove a contract registration
     * @param contractType The type identifier of the contract to remove
     */
    function removeContract(bytes32 contractType) external onlyRole(ADMIN_ROLE) {
        address contractAddress = _contracts[contractType];
        require(contractAddress != address(0), "Contract type not registered");

        delete _contracts[contractType];
        delete _versions[contractAddress];

        emit ContractRemoved(contractType, contractAddress);
    }

    /**
     * @dev Get the address of a registered contract
     * @param contractType The type identifier of the contract
     * @return The contract address
     */
    function getContract(bytes32 contractType) external view returns (address) {
        return _contracts[contractType];
    }

    /**
     * @dev Get the version of a contract
     * @param contractAddress The address of the contract
     * @return The contract version
     */
    function getContractVersion(address contractAddress) external view returns (string memory) {
        return _versions[contractAddress];
    }

    /**
     * @dev Pause the registry
     */
    function pause() external onlyRole(ADMIN_ROLE) {
        _pause();
    }

    /**
     * @dev Unpause the registry
     */
    function unpause() external onlyRole(ADMIN_ROLE) {
        _unpause();
    }

    /**
     * @dev Function that should revert when `msg.sender` is not authorized to upgrade the contract
     */
    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}