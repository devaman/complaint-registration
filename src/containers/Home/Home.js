import React, { Component } from 'react';
import ComplaintContract from '../../../build/contracts/Complaint.json'
import Loader from "../../components/Loader/Loader";
import { getWeb3, getContractInstance } from '../../utils/getWeb3'
let web3 = getWeb3();
let complaintInstance = getContractInstance(ComplaintContract, "0xda81f3daa4d3e9a493514dab5adf5f7bcefa708b")

class Home extends Component {

    state = {
        storageValue: 0,
        accounts: null,
        load: true
    }

    async componentWillMount() {

        let accounts = await web3.eth.getAccounts();
        this.setState({
            accounts,
            load: false
        })
        


    }
    render() {
        
        console.log(this.state.accounts);
        if (this.state.load) {
            return (<Loader />)
        }
        else
            return (
                <div className="App">
                    <nav className="navbar pure-menu pure-menu-horizontal">
                        <a href="#" className="pure-menu-heading pure-menu-link">Complaints</a>
                    </nav>

                    <main className="container">
                        <div className="pure-g">
                            <div className="pure-u-1-1">
                                {this.state.accounts}
                            </div>
                        </div>
                    </main>
                </div>
            );
    };
};
export default Home;