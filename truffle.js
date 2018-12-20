  var HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic ="cattle novel scatter exhibit canyon syrup grunt dinosaur route cable debate embark";
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks:{
  	ganache:{
  		host:'127.0.0.1',
  		port:8545,
  		network_id:"*"
  	},
  	rinkeby: {
      provider: function () {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/i1b6qEdLoWdspQ1ozvk4");
      },
      network_id: 1
    }
  }

};

