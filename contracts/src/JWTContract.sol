// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "./Counter.sol";

/**
 * @title QSoundSong
 * @dev A contract representing a QSoundSong NFT (ERC721 token).
 */

contract JWTContract is ERC721 {
    uint256 public currentTokenId;

    Counter private _tokenIdCounter;

    string private _tokenURI;
    uint256 private mintPrice;
    uint256 private mintCount;
    bool private allowMint;
    address private owner;
    mapping(address => bool) private minters;

    // Event triggered when deploying the contract
    event Initialized(
        string _uris,
        uint256 _mintCount,
        uint256 _tokenPrice,
        address owner,
        bool _allowMints
    );

    // Event triggered when minting starts
    event MintStarted(uint256 timestamp);

    // Event triggered when minting is paused
    event MintPaused(uint256 timestamp);

    // Event triggered when a token URI is updated
    event TokenURIUpdated(string newUri);

    // Event triggered when the price is updated
    event TokenPriceUpdated(uint256 newPrice);

    // Event triggered when the mint count is updated
    event MintCountUpdated(uint256 newMintCount);

    // Event triggered when a token is minted
    event TokenMinted(address indexed account, uint256 indexed tokenId, uint256 timestamp);

    

    

    constructor(
        string memory _uri,
        uint256 _mintCount,
        uint256 _tokenPrice,
        bool _allowMint,
        address creator
    ) ERC721("JWTToken", "JWT") {
        mintCount = _mintCount;
        _tokenURI = _uri;
        mintPrice = _tokenPrice;
        owner = creator;
        emit Initialized(_uri, _mintCount, _tokenPrice, creator, _allowMint);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Unauthorized");
        _;
    }

    /**
     * @dev Start the minting process.
     */
    function startMint() public onlyOwner {
        require(!allowMint, "Mint started");
        allowMint = true;
        emit MintStarted(block.timestamp);
    }

    /**
     * @dev Pause the minting process.
     */
    function pauseMint() public onlyOwner {
        require(allowMint, "Mint paused");
        allowMint = false;
        emit MintPaused(block.timestamp);
    }

    /**
     * @dev Returns the URI for a given token.
     * @return The URI string.
     */
    function tokenURI() public view returns (string memory) {
        return _tokenURI;
    }

    /**
     * @dev Set a new URI for a token.
     * @param _newUri The new URI.
     */
    function setURI(string memory _newUri) public onlyOwner {
        _tokenURI = _newUri;
        emit TokenURIUpdated(_newUri);
    }

    /**
     * @dev Set a custom price for a token.
     * @param _price The new price for the token.
     */
    function setMintPrice(uint256 _price) public onlyOwner {
        // can be 0, should be zero
        mintPrice = _price;
        emit TokenPriceUpdated(_price);
    }

    /**
     * @dev Set the mint count for a token.
     * @param _mintCount The new mint count for the token.
     */
    function setMintCount(uint256 _mintCount) public onlyOwner {
        require(_mintCount > 0, "Invalid count");
        mintCount = _mintCount;
        emit MintCountUpdated(_mintCount);
    }

    /**
     * @dev Mint a token to the specified account.
     * @param to The recipient of the minted token.
     */
    function mint(address to) public payable /*onlyMinter*/
    {
        require(allowMint, "Mint Paused");
        require(msg.value >= mintPrice, "Insufficient Funds");
        require(balanceOf(to) == 0, "One token per account");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        emit TokenMinted(to, tokenId, block.timestamp);
    }
}