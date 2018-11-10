import React, { Component } from 'react';
import ComplaintContract from '../../../build/contracts/Complaint.json'
import Loader from "../../components/Loader/Loader";
import { getWeb3, getContractInstance } from '../../utils/getWeb3'
import address from "../../utils/ContractAddress";
import ComplaintItems from '../../components/ComplaintItems/ComplaintItems.js';
import './Home.css'
import { withRouter } from "react-router";
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
            accepted: [],
            closed: [],
            show: []
        }
    }

    componentDidMount() {
        this.fn();

    }
    // updateShowArr = (index, val) => {
    //     this.setState({
    //         complaints: {
    //             ...this.state.complaints,
    //             show: this.state.complaints.show.map((d, i) => {
    //                 if (i === index) {
    //                     return val;
    //                 }
    //                 else return d;
    //             })
    //         }
    //     })
    // }
    updateAcceptedArr = (index, val) => {
        this.setState({
            complaints: {
                ...this.state.complaints,
                accepted: this.state.complaints.accepted.map((d, i) => {
                    if (i === index) {
                        return val;
                    }
                    else return d;
                })
            }
        })
    }
    updateClosedArr = (index, val) => {
        this.setState({
            complaints: {
                ...this.state.complaints,
                closed: this.state.complaints.closed.map((d, i) => {
                    if (i === index) {
                        return val;
                    }
                    else return d;
                })
            }
        })
    }
    fn = async () => {

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
        let arr = Array(cmp1[0].length).fill(true);
        console.log(arr);

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
                closed: cmp1[5],
                show: arr
            },
            load: false
        })


    }
    onClickAccepted = () => {

        this.setState({
            complaints: {
                ...this.state.complaints,
                show: [...this.state.complaints.accepted]
            }
        })
    }
    // onChangeAccepted
    onClickOpened = () => {

        this.setState({
            complaints: {
                ...this.state.complaints,
                show: this.state.complaints.closed.map((data) => {
                    return !data;
                })
            }
        })
    }
    onClickClosed = () => {

        this.setState({
            complaints: {
                ...this.state.complaints,
                show: [...this.state.complaints.closed]
            }
        })
    }
    onClickAll = () => {
        let arr = Array(this.state.complaints.cat.length).fill(true);
        this.setState({
            complaints: {
                ...this.state.complaints,
                show: arr
            }
        })
    }
    on
    render() {

        return (
            <div className="Home">
                {this.state.load ? <Loader /> : ""}

                <nav className="navbar pure-menu pure-menu-horizontal">
                    <a href="javascript:void(0);" onClick={() => { this.props.history.push('/') }} className="pure-menu-heading pure-menu-link">Complaints</a>
                    <a href="javascript:void(0);" onClick={() => { this.props.history.push('/register') }} className="pure-menu-heading pure-menu-link">Register</a>
                    {this.props.admin ? <a href="javascript:void(0);" onClick={() => { this.props.history.push('/admin') }} className="pure-menu-heading pure-menu-link">Admin</a> : ""}

                </nav>
                <main className="cont">
                    <span className="pure-menu pure-menu-horizontal center" style={{ listStyle: "none" }}>
                        <a href="javascript:void(0);" onClick={this.onClickAll} className="pure-menu-heading pure-menu-link" id="Allli">All</a>
                        <a href="javascript:void(0);" onClick={this.onClickOpened} className="pure-menu-heading pure-menu-link" id="Openedli">Opened</a>
                        <a href="javascript:void(0);" onClick={this.onClickAccepted} className="pure-menu-heading pure-menu-link" id="Acceptedli">Accepted</a>
                        <a href="javascript:void(0);" onClick={this.onClickClosed} className="pure-menu-heading pure-menu-link" id="Closedli">Closed</a>

                    </span>
                    <ComplaintItems {...this.state.complaints} updateAcceptedArr={this.updateAcceptedArr} updateClosedArr={this.updateClosedArr} account={this.state.accounts} />
                </main>
            </div>
        );
    };
};
export default withRouter(Home);