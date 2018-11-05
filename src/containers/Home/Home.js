import React, { Component } from 'react';
import ComplaintContract from '../../../build/contracts/Complaint.json'
import Loader from "../../components/Loader/Loader";
import { getWeb3, getContractInstance } from '../../utils/getWeb3'
import address from "../../utils/ContractAddress";
import ComplaintItems from '../../components/ComplaintItems/ComplaintItems.js';
let web3 = getWeb3();
let complaintInstance = getContractInstance(ComplaintContract, address)

class Home extends Component {

    state = {
        storageValue: 0,
        accounts: null,
        load: true,
        complaints: {
            name: [],
            rollno: [],
            cat: [],
            sub: [],
            complaint: [],
            timestamp: 0,
        }
    }

    async componentDidMount() {

        let accounts = await web3.eth.getAccounts();
        let cmp1 = await complaintInstance.methods.getAllValuesComplaints().call();
        let cmp2 = await complaintInstance.methods.getAllValuesCreators().call();
        cmp1[3] = cmp1[3].map((i) => {
            return web3.utils.toAscii(i)
        })
        cmp2[1] = cmp2[1].map((i) => {
            return web3.utils.toAscii(i)
        })
        cmp2[2] = cmp2[2].map((i) => {
            return web3.utils.toAscii(i)
        })

        this.setState({
            accounts,
            complaints: {
                creator: cmp2[0],
                name: cmp2[1],
                rollno: cmp2[2],
                cat: cmp1[0],
                sub: cmp1[1],
                timestamp: cmp1[2],
                complaint: cmp1[3],
                accepted: cmp1[4],
                closed: cmp1[5]

            },
            load: false
        })



    }

    render() {


        return (
            <div className="App">
                {this.state.load ? <Loader /> : ""}

                <nav className="navbar pure-menu pure-menu-horizontal">
                    <a href="javascript:void(0);" onClick={() => { this.props.history.push('/') }} className="pure-menu-heading pure-menu-link">Complaints</a>
                    <a href="javascript:void(0);" onClick={() => { this.props.history.push('/register') }} className="pure-menu-heading pure-menu-link">Register</a>
                    <a href="javascript:void(0);" onClick={() => { this.props.history.push('/accepted') }} className="pure-menu-heading pure-menu-link">Accepted</a>
                </nav>

                <main className="container">
                    <ComplaintItems {...this.state.complaints} />
                </main>
            </div>
        );
    };
};
export default Home;