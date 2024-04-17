// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "forge-std/Script.sol";
import "../src/JwtContractV2.sol";
import "forge-std/Test.sol";

contract DeployScript is Script, Test {
    function run() external {
        vm.startBroadcast();
        
        // Set your desired nonce here
        // uint64 nonce = 1725220; // Example nonce
        uint64 nonce = vm.getNonce(address(0x093515eddF986a5680db7dc3c32e93f4c4037FF6));
        emit log_uint(nonce);
        nonce++;
        nonce++; //to account for pending txn
        nonce++; //to account for pending txn

        emit log_uint(nonce);
        
        vm.setNonce(address(0x093515eddF986a5680db7dc3c32e93f4c4037FF6), nonce);

        new JwtContractV2(true);

        vm.stopBroadcast();
    }
}