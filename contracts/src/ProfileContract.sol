// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

/**
 * @title ProfileContract
 * @dev A contract representing a A Polar Profile as an NFT
 */

contract ProfileContract is ERC721, Ownable {
    uint256 public currentTokenId;
    // should all this be metadata on filecoin? maybe yes
    string private profile_name;
    string private display_name;
    string private dp_uri;
    bool private allowMint;

    constructor(
        bool _allowMint
    ) ERC721("PolarProfile", "PRO") Ownable(msg.sender) {
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
    function mint(
        address to,
        string memory _name,
        string memory _display_name,
        string memory _dp_uri
    ) public payable returns (uint256 tokenId) {
        require(allowMint, "Minting is currently paused");
        require(balanceOf(to) == 0, "Only one token per account is allowed");
        tokenId = currentTokenId;
        currentTokenId++;
        profile_name = _name;
        display_name = _display_name;
        dp_uri = _dp_uri;
        _safeMint(to, tokenId);
    }

    // SETTER FUNCTIONS

    /**
     * @dev Setter function to update the createJwtFee.
     * @param _name The new fee required to create the JWTContract contract.
     */
    function setName(string memory _name) public onlyOwner {
        profile_name = _name;
    }

    /**
     * @dev Setter function to update the createJwtFee.
     * @param _displayName The new fee required to create the JWTContract contract.
     */
    function setDisplayName(string memory _displayName) public onlyOwner {
        display_name = _displayName;
    }

    /**
     * @dev Setter function to update the createJwtFee.
     * @param _dp_uri The new fee required to create the JWTContract contract.
     */
    function setDpUri(string memory _dp_uri) public onlyOwner {
        dp_uri = _dp_uri;
    }

    // GETTER FUNCTIONS

    /**
     * @dev Getter function to return the profile_name.
     * @return profile_name of the profile
     */
    function getName() public view returns (string memory) {
        return profile_name;
    }

    /**
     * @dev Getter function to return the display profile_name.
     * @return display_name of the profile
     */
    function getDisplayName() public view returns (string memory) {
        return display_name;
    }

    /**
     * @dev Getter function to return the dp_uri.
     * @return do_uri of the profile - profile picture
     */
    function getDpUri() public view returns (string memory) {
        return dp_uri;
    }
    
}
