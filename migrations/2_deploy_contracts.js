var DappToken     = artifacts.require("./DappToken.sol");
var DappTokenSale = artifacts.require("./DappTokenSale.sol");

module.exports = function(deployer) {
  deployer.deploy(DappToken, 1000000).then(function(){
    var tokenPrice = 1000000000000000; // Token Price is 0.001 ether
    return deployer.deploy(DappTokenSale, DappToken.address, tokenPrice);
  });
};
