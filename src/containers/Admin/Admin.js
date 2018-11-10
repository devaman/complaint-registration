import React, { Component } from 'react';
import { withRouter } from "react-router";
import ComplaintContract from '../../../build/contracts/Complaint.json'
import { getWeb3, getContractInstance } from '../../utils/getWeb3'
import Loader from '../../components/Loader/Loader.js';
import address from "../../utils/ContractAddress";

let web3 = getWeb3();
let complaintInstance = getContractInstance(ComplaintContract, address);

class Admin extends Component {
    state = {
        accounts:"",
        cat: 0,
        sub: 11,
        address: "",
        name: "",
        msg:"",
        load: true
    }
    async componentWillMount() {

        let accounts = await web3.eth.getAccounts();
        this.setState({
            accounts: accounts[0],
            load: false
        })



    }
    onFormSubmit = async (e) => {
        e.preventDefault();
        this.setState({
            load:true
        })
        // console.log(this.state.cat, this.state.sub);
        let cat = parseInt(this.state.cat);
        let sub = parseInt(this.state.sub);
        complaintInstance.methods.setJugde(cat, sub, this.state.address, this.state.name).send({ from: this.state.accounts }, (err) => {
            if (err) {
                let mesg = err.message.split(":")
                mesg = mesg[mesg.length - 1];
                mesg = mesg.toString()

                this.setState({
                    msg: mesg,
                    load: false
                })
            } else {
                this.setState({
                    msg: "Judge Registered Successfully!",
                    name: "",
                    address: "",
                    cat: 0,
                    sub: 11,
                    load: false
                })
            }
        })
    }
    render() {
        
        return (
            <div>
                {this.state.load ? <Loader /> : ""}

                <nav className="navbar pure-menu pure-menu-horizontal">
                    <a href="javascript:void(0);" onClick={() => { this.props.history.push('/') }} className="pure-menu-heading pure-menu-link">Complaints</a>
                    <a href="javascript:void(0);" onClick={() => { this.props.history.push('/register') }} className="pure-menu-heading pure-menu-link">Register</a>
                    {this.props.admin ? <a href="javascript:void(0);" onClick={() => { this.props.history.push('/admin') }} className="pure-menu-heading pure-menu-link">Admin</a> : ""}

                </nav>
                <main className="container">
                    <br />
                    <h6>{this.state.msg}</h6>

                    <form onSubmit={this.onFormSubmit}>
                        <select required name="cat" value={this.state.cat} onChange={(e) => {
                            console.log(e.target.value);

                            this.setState({
                                cat: e.target.value
                            })
                        }} >
                            <option value={0}>Maintaince</option>
                            <option value={1}>Electricity</option>
                            <option value={2}>Hostel</option>
                        </select><br />
                        <select required name="sub" value={this.state.sub} onChange={(e) => {

                            this.setState({
                                sub: e.target.value
                            })
                        }} >
                            <option value={11}>CSE</option>
                            <option value={12}>ECE</option>
                            <option value={13}>Kailash Boys Hostel</option>

                        </select><br />
                        <input type="text" placeholder="Name" name="name" value={this.state.name} onChange={(e) => {

                            this.setState({
                                name: e.target.value
                            })
                        }} /><br />
                        <input type="text" placeholder="Address" name="address" value={this.state.address} onChange={(e) => {

                            this.setState({
                                address: e.target.value
                            })
                        }} /><br />
                        <input type="submit" value="Register it" />
                    </form>
                </main>
            </div>
        );
    }
}
export default withRouter(Admin);