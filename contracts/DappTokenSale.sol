pragma solidity ^0.4.2;
import "./DappToken.sol";

contract DappTokenSale {
    address admin;
    DappToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    event Sell(address _buyer, uint256 _amount);

    constructor(DappToken _tokenContract, uint256 _tokenPrice) public {
        admin           = msg.sender;
        tokenContract   = _tokenContract;
        tokenPrice      = _tokenPrice;

    }

    // Multiply
    function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    // Buy tokens
    function buyTokens(uint256 _numberOfTokens) public payable {
        // Require that value is equal to tokens
        require(msg.value == multiply(_numberOfTokens, tokenPrice), "Some message");

        // Require that the contract has enough tokens
        require(tokenContract.balanceOf(this) >= _numberOfTokens, "Some message");

        // Require that transfer is successful
        require(tokenContract.transfer(msg.sender, _numberOfTokens));
        
        // Keep track of tokensSold
        tokensSold += _numberOfTokens;

        // Trigger sell event
        emit Sell(msg.sender, _numberOfTokens);
    }
}