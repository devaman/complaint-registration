import React, { Component } from 'react';
import { withRouter } from "react-router";
import ComplaintContract from '../../../build/contracts/Complaint.json'
import { getWeb3, getContractInstance } from '../../utils/getWeb3'
import './Admin.css'
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
                    <h3>{this.state.msg}</h3>
                    <h2>ASSIGN THE COMPLAINT</h2>

                    <form className="center" onSubmit={this.onFormSubmit}>

                    <div class="row">
                             <div className="col-30">
                                 <label>Category</label>
                             </div>
                         <div className="col-70">
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
                        </div>
                 </div>
                  <div class="row">
                             <div className="col-30">
                                 <label>Sub-Category</label>
                             </div>
                         <div className="col-70">
                        <select required name="sub" value={this.state.sub} onChange={(e) => {

                            this.setState({
                                sub: e.target.value
                            })
                        }} >
                            <option value={11}>CSE</option>
                            <option value={12}>ECE</option>
                            <option value={13}>Kailash Boys Hostel</option>

                        </select><br />
                        </div>
                 </div>

                 <div class="row">
                             <div className="col-30">
                                 <label>Name</label>
                             </div>
                         <div className="col-70">
                        <input type="text" placeholder="Name" name="name" value={this.state.name} onChange={(e) => {

                            this.setState({
                                name: e.target.value
                            })
                        }} /><br />
                         </div>
                 </div>

                 <div class="row">
                             <div className="col-30">
                                 <label>Address</label>
                             </div>
                         <div className="col-70">
                        <input type="text" placeholder="Address" name="address" value={this.state.address} onChange={(e) => {

                            this.setState({
                                address: e.target.value
                            })
                        }} /><br />
                    </div>
                 </div>
                        <input type="submit" value="Assign it" />
                    </form>
                </main>
            </div>
        );
    }
}
export default withRouter(Admin);