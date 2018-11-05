import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ComplaintContract from '../build/contracts/Complaint.json'
import { getWeb3, getContractInstance } from './utils/getWeb3'
import address from "./utils/ContractAddress";
let web3 = getWeb3();
let complaintInstance = getContractInstance(ComplaintContract, address)
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import Home from './containers/Home/Home';
import Register from './containers/Register/Register';
import Admin from './containers/Admin/Admin.js';
class App extends Component {
state={
  admin:false
}
async componentDidMount(){
  let accounts = await web3.eth.getAccounts();
  let Admin = await complaintInstance.methods.owner().call();
  if(Admin === accounts[0])
  this.setState({
    admin: true
  })

}
  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route path='/register' exact component={(props)=><Register admin={this.state.admin}/>} />
            <Route path='/' exact component={(props)=><Home admin={this.state.admin}/>} />
          {this.state.admin ? <Route path='/admin' exact component={(props) => <Admin admin={this.state.admin}/>} />:""}
            
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App
