// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/base/ERC721Base.sol";
import "@thirdweb-dev/contracts/extension/Ownable.sol";

contract ProfileNFT is ERC721Base, Ownable {
    
    struct ProfileData {
        string nickname;
        address walletAddress;
        uint256 transactionCount;
        uint256 accountAge;
        uint256 nftCount;
        uint256 mintTimestamp;
    }
    
    mapping(uint256 => ProfileData) public profiles;
    mapping(address => uint256) public addressToTokenId;
    mapping(address => bool) public hasMinted;
    
    uint256 private _nextTokenId = 1;
    
    constructor(
        address _defaultAdmin,
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint128 _royaltyBps
    ) ERC721Base(_defaultAdmin, _name, _symbol, _royaltyRecipient, _royaltyBps) {}
    
    function mintProfile(
        address to,
        string memory uri,
        string memory nickname,
        uint256 transactionCount,
        uint256 accountAge,
        uint256 nftCount
    ) public {
        require(!hasMinted[to], "Address has already minted a profile NFT");
        
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;
        
        _mint(to, tokenId);
        _setTokenURI(tokenId, uri);
        
        profiles[tokenId] = ProfileData({
            nickname: nickname,
            walletAddress: to,
            transactionCount: transactionCount,
            accountAge: accountAge,
            nftCount: nftCount,
            mintTimestamp: block.timestamp
        });
        
        addressToTokenId[to] = tokenId;
        hasMinted[to] = true;
    }
    
    function getProfile(uint256 tokenId) public view returns (ProfileData memory) {
        require(_exists(tokenId), "Token does not exist");
        return profiles[tokenId];
    }
    
    function getProfileByAddress(address owner) public view returns (ProfileData memory) {
        require(hasMinted[owner], "Address has not minted a profile NFT");
        uint256 tokenId = addressToTokenId[owner];
        return profiles[tokenId];
    }
    
    function updateProfile(
        uint256 tokenId,
        string memory nickname,
        uint256 transactionCount,
        uint256 accountAge,
        uint256 nftCount
    ) public {
        require(ownerOf(tokenId) == msg.sender, "Not the owner of this token");
        
        ProfileData storage profile = profiles[tokenId];
        profile.nickname = nickname;
        profile.transactionCount = transactionCount;
        profile.accountAge = accountAge;
        profile.nftCount = nftCount;
    }
    
    // Override transfer functions to make NFTs soulbound (optional)
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        require(from == address(0) || to == address(0), "Profile NFTs are soulbound");
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
