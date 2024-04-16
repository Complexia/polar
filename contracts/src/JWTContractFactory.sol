// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "openzeppelin-contracts/contracts/access/Ownable.sol";
import "./JWTContract.sol";

/**
 * @title JWTFactoryContract
 * @dev A contract factory for deploying instances of the JWTContract contract.
 */

contract JWTContractFactory is Ownable {
    
    uint256 public currentTokenId;

    uint256 private createJwtFee;
    mapping(uint256 => JWTContract) private jwtcontracts;
    uint256 private _ownerIncome;
    string private encrypted_jwt_secret;

     /**
     * @dev Constructor function to set the createJwtFee.
     * @param _createJwtFee The fee required to create the JWTContract contract.
     */
    constructor(uint256 _createJwtFee) Ownable(msg.sender) {
        createJwtFee = _createJwtFee;
    }

    /**
     * @dev Setter function to update the createJwtFee.
     * @param _newCreateJwtFee The new fee required to create the JWTContract contract.
     */
    function setCreateJwtFee(uint256 _newCreateJwtFee) public onlyOwner {
        createJwtFee = _newCreateJwtFee;
    }

    function createJWTContract(
        string memory _uri,
        uint256 _mintCount,
        uint256 _tokenPrice,
        bool _allowMint,
        string memory _encrypted_jwt_secret

    ) public {
        // require(msg.value >= createJwtFee, "Insufficient fee");
        uint256 jwt_id = currentTokenId;
        JWTContract newJwt = new JWTContract(
            _uri,
            _mintCount,
            _tokenPrice,
            _allowMint,
            msg.sender,
            address(this),
            encrypted_jwt_secret = _encrypted_jwt_secret
        );
        jwtcontracts[jwt_id] = newJwt;
        currentTokenId++;
        emit JWTContractCreated(
            jwt_id,
            address(newJwt),
            msg.sender,
            _uri,
            _tokenPrice,
            _mintCount,
            _allowMint,
            block.timestamp
        );
    }

     /**
     * @dev Start the minting process for a jwt.
     * @param jwt_id The ID of the jwt to start minting for.
     */
    function startMint(uint256 jwt_id) public {
        jwtcontracts[jwt_id].startMint();
        emit MintStarted(jwt_id, block.timestamp);
    }

    /**
     * @dev Pause the minting process for a jwt.
     * @param jwt_id The ID of the jwt to pause minting for.
     */
    function pauseMint(uint256 jwt_id) public {
        jwtcontracts[jwt_id].pauseMint();
        emit MintPaused(jwt_id, block.timestamp);
    }

    // GETTER FUNCTIONS

    function getCreateJwtFee() public view returns (uint256) {
        return createJwtFee;
    }

    // GETTER FUNCTIONS

    function getJwtSecret() public view returns (string memory) {
        return encrypted_jwt_secret;
    }

    /**
     * @dev Returns the token URI for a given jwt contract.
     * @param jwt_id The ID of the jwt contract.
     * @return The URI string.
     */
    function tokenURI(uint256 jwt_id) public view returns (string memory) {
        return jwtcontracts[jwt_id].tokenURI(0);
    }

    /**
     * @dev Set a new URI for a jwt's token.
     * @param jwt_id The ID of the jwt.
     * @param _newUri The new URI.
     */
    function setURI(uint256 jwt_id, string memory _newUri) public {
        jwtcontracts[jwt_id].setURI(_newUri);
        emit TokenURIUpdated(jwt_id, _newUri);
    }

    //  /**
    //  * @dev Set a new jwt secret 
    //  * @param jwt_id The ID of the jwt.
    //  * @param _encrypted_jwt_secret The new URI.
    //  */
    // function setJwtSecret(uint256 jwt_id, string memory _encrypted_jwt_secret) public {
    //     jwtcontracts[jwt_id].setJwtSecret(_encrypted_jwt_secret);
    //     emit TokenURIUpdated(jwt_id, _encrypted_jwt_secret);
        
    // }

    /**
     * @dev Set a custom price for a jwt's token.
     * @param jwt_id The ID of the jwt.
     * @param _price The new price for the token.
     */
    function setMintPrice(uint256 jwt_id, uint256 _price) public {
        require(_price > 0, "Invalid Price");
        jwtcontracts[jwt_id].setMintPrice(_price);
        emit TokenPriceUpdated(jwt_id, _price);
    }

    /**
     * @dev Set the mint count for a jwt's token.
     * @param jwt_id The ID of the jwt.
     * @param _mintCount The new mint count for the token.
     */
    function setMintCount(uint256 jwt_id, uint256 _mintCount) public onlyOwner {
        jwtcontracts[jwt_id].setMintCount(_mintCount);
        emit MintCountUpdated(jwt_id, _mintCount);
    }

    /**
     * @dev Mint a token for a specific jwt and recipient.
     * @param jwt_id The ID of the jwt.
     * @param to The recipient of the minted token.
     */
   function mint(uint256 jwt_id, address to, string memory _encrypted_jwt_secret) public payable {
    (bool success, bytes memory data) = address(jwtcontracts[jwt_id]).call{value: msg.value}(
        abi.encodeWithSignature("mint(address, encrypted_jwt_secret)", to, _encrypted_jwt_secret)
    );

    if (success) {
        // Assuming the mint function returns the new token ID as uint256
        uint256 tokenId;
        assembly {
            tokenId := mload(add(data, 32))
        }
        emit TokenMinted(jwt_id, to, tokenId, block.timestamp);
    } else {
        // Handle failure (revert or emit a failure event)
        revert("Minting failed.");
    }
} 

    /**
     * @dev Allow the contract owner to claim their accumulated income.
     */
    function claimIncome() public onlyOwner {
        require(_ownerIncome > 0, "No income to claim");
        payable(msg.sender).transfer(_ownerIncome);
        _ownerIncome = 0;
        emit IncomeClaimed(_ownerIncome, msg.sender, block.timestamp);
    }

    // Event triggered when creating a jwt contract
    event JWTContractCreated(
        uint256 indexed jwt_id,
        address indexed jwt_contract,
        address indexed owner,
        string uri,
        uint256 mintPrice,
        uint256 tokenCount,
        bool allowMint,
        uint256 timestamp
    );

    // Event triggered when minting starts
    event MintStarted(uint256 indexed jwt_id, uint256 timestamp);

    // Event triggered when minting is paused
    event MintPaused(uint256 indexed jwt_id, uint256 timestamp);

    // Event triggered when a token URI is updated
    event TokenURIUpdated(uint256 indexed jwt_id, string newUri);

    // Event triggered when the price is updated
    event TokenPriceUpdated(uint256 indexed jwt_id, uint256 newPrice);

    // Event triggered when the mint count is updated
    event MintCountUpdated(uint256 indexed jwt_id, uint256 newMintCount);

    // Event triggered when a token is minted
    event TokenMinted(uint256 indexed jwt_id, address indexed account, uint256 token_id, uint256 timestamp);

    // Event triggered when owner claims their rewards
    event IncomeClaimed(uint256 amount, address claimer, uint256 timestamp);

 }