// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IYieldSphereRegistry
 * @dev Interface for the YieldSphere registry contract
 */
interface IYieldSphereRegistry {
    function registerContract(bytes32 contractType, address contractAddress, string calldata version) external;
    function updateContract(bytes32 contractType, address newContractAddress, string calldata version) external;
    function removeContract(bytes32 contractType) external;
    function getContract(bytes32 contractType) external view returns (address);
    function getContractVersion(address contractAddress) external view returns (string memory);
}