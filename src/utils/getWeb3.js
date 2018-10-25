const Web3 = require("web3") // import web3 v1.0 constructor
const getWeb3 = () => {
  var provider ;
  provider = window.web3.currentProvider 
  let myWeb3;
  if(provider){
    myWeb3 = new Web3(provider)
  }else{
    provider = new Web3.providers.HttpProvider("http://localhost:8545");
    myWeb3 = new Web3(provider)

  }

  /* 
  Uncomment the below code to run on rinkeby test net
  */
  // var HDWalletProvider = require("truffle-hdwallet-provider");
  // const mnemonic = "";
  // var provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/i1b6qEdLoWdspQ1ozvk4",0,10);

  return myWeb3
}
const web3 = getWeb3();
// assumes passed-in web3 is v1.0 and creates a function to receive contract name
const getContractInstance = (abi, deployedAddress) => {
  abi = JSON.parse(JSON.stringify(abi))
  const instance = new web3.eth.Contract(abi.abi, deployedAddress)
  return instance
}

module.exports = { getWeb3, getContractInstance }