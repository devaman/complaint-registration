import React, { Component } from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import {getWeb3,getContractInstance} from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
let web3 = getWeb3();
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  async componentDidMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

      
      // Instantiate contract once web3 provided.
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    // simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    // var simpleStorageInstance

    // Get accounts.
    let accounts = await web3.eth.getAccounts();
    let simpleStorageInstance = getContractInstance(SimpleStorageContract,"0x64482b880d59c85b5a0df8860fdd8a8680671a21")
    console.log(simpleStorageInstance);
    

       await simpleStorageInstance.methods.set(5).send({from: accounts[0]})
      
        // Get the value from the contract to prove it worked.
       const result =  await simpleStorageInstance.methods.get().call()
        // Update state with the result.
        console.log(result);
        
         this.setState({ storageValue: result })
    
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Complaints</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <h2>Smart Contract Example</h2>
              <p>If your contracts compiled and migrated successfully, below will show a stored value of 5 (by default).</p>
              <p>Try changing the value stored on <strong>line 59</strong> of App.js.</p>
              <p>The stored value is: {this.state.storageValue}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
