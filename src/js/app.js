App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function(){
    console.log('app initialized');
    return App.initWeb3();
  },
  initWeb3: function(){
    if(typeof(web3) != undefined){
      // If a web3 provider is already provided by the Meta Mask
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    }else{
      // Specify default instance if no web3 instance is provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContracts();
  },

  initContracts: function(){
    $.getJSON('DappTokenSale.json', function(dappTokenSale){
      App.contracts.DappTokenSale = TruffleContract(dappTokenSale);
      App.contracts.DappTokenSale.setProvider(App.web3Provider);
      App.contracts.DappTokenSale.deployed().then(function(dappTokenSale){
        console.log('Dapp token sale address: ', dappTokenSale.address);
      })
    }).done(function(){
      $.getJSON('DappToken.json', function(dappToken){
        App.contracts.DappToken = TruffleContract(dappToken);
        App.contracts.DappToken.setProvider(App.web3Provider);
        App.contracts.DappToken.deployed().then(function(dappToken){
          console.log('Dapp token address: ', dappToken.address);
        });
        return App.render(); 
      });
    });
  },

  render: function(){
    web3.eth.getCoinbase(function(err, account){
      if(err === null){
        console.log("account: ", account);
        App.account = account;
        $("#accountAddress").html("Your account address is: " + account);
      }
    })
  }
}

$(function(){
  $(window).on('load', function () {
    App.init();
  })
});