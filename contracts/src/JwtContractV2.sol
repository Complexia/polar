// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

/**
 * @title JwtContractV2
 * @dev A contract representing a JWT secret (encrypted) as an NFT
 */

contract JwtContractV2 is ERC721, Ownable {
    uint256 public currentTokenId;
    string private encrypted_jwt_secret;
    bool private allowMint;
    
    constructor(
        bool _allowMint
        
    ) ERC721("JWTToken", "JWT") Ownable(msg.sender) {
        allowMint = _allowMint;
    }

    /**
     * @dev Start the minting process.
     */
    function startMint() public onlyOwner {
        require(!allowMint, "Mint already started");
        allowMint = true;
    }

    /**
     * @dev Pause the minting process.
     */
    function pauseMint() public onlyOwner {
        require(allowMint, "Mint already paused");
        allowMint = false;
    }

    /**
     * @dev Mint a token to the specified account.
     * @param to The recipient of the minted token.
     * @return tokenId The ID of the minted token.
     */
    function mint(address to, string memory _encrypted_jwt_secret) public payable returns (uint256 tokenId) {
        require(allowMint, "Minting is currently paused");
        require(balanceOf(to) == 0, "Only one token per account is allowed");
        tokenId = currentTokenId;
        currentTokenId++;
        encrypted_jwt_secret = _encrypted_jwt_secret;
        _safeMint(to, tokenId);
    }
}
