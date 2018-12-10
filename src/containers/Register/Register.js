import React, { Component } from 'react';
import ComplaintContract from '../../../build/contracts/Complaint.json'
import { getWeb3, getContractInstance } from '../../utils/getWeb3'
import Loader from '../../components/Loader/Loader.js';
import './Register.css'
import address from "../../utils/ContractAddress";
import { withRouter } from "react-router";
let web3 = getWeb3();
let complaintInstance = getContractInstance(ComplaintContract, address)
class Register extends Component {

    state = {
        name: "",
        rollno: "",
        cat: 0,
        sub: 11,
        complaint: "",
        timestamp: 0,
        accounts: "",
        msg: ""
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
            load: true
        })
        let date = Date.now()
        let name = web3.utils.fromAscii(this.state.name);
        let rollno = web3.utils.fromAscii(this.state.rollno);
        let cat = parseInt(this.state.cat);
        let sub = parseInt(this.state.sub);
        let complaint = web3.utils.fromAscii(this.state.complaint);
        complaintInstance.methods.registerComplaint(name, rollno, cat, sub, date, complaint).send({ from: this.state.accounts }, (err) => {
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
                    msg: "Complaint Registered Successfully!",
                    name: "",
                    rollno: "",
                    cat: "",
                    sub: "",
                    complaint: "",
                    timestamp: 0,
                    load: false
                })
            }

        })





    }
    render() {

        return (
            <div className="Register">
                {this.state.load ? <Loader /> : ""}

                <nav className="navbar pure-menu pure-menu-horizontal">
                    <a href="javascript:void(0);" onClick={() => { this.props.history.push('/') }} className="pure-menu-heading pure-menu-link">Complaints</a>
                    <a href="javascript:void(0);" onClick={() => { this.props.history.push('/register') }} className="pure-menu-heading pure-menu-link">Register</a>
                    {this.props.admin ? <a href="javascript:void(0);" onClick={() => { this.props.history.push('/admin') }} className="pure-menu-heading pure-menu-link">Admin</a> : ""}
               
                </nav>
                

                <main className="container">
                <br/>

                    <h3>{this.state.msg}</h3>

                        <h2>REGISTER YOUR COMPLAINT</h2>

                        
                    <form className="center" onSubmit={this.onFormSubmit}>
                 <div class="row">
                             <div className="col-30">
                                 <label>Name</label>
                             </div>
                         <div className="col-70">
                             <input type="text" placeholder="Enter Your Name" name="name" value={this.state.name} onChange={(e) => {
                            this.setState({
                                name: e.target.value
                            })
                        }} /><br />
                         </div>
                 </div>


                   <div class="row">
                             <div className="col-30">
                                 <label>Roll No</label>
                             </div> 
                             <div className="col-70">
                        <input type="text" placeholder="Enter Your RollNo" name="rollno" value={this.state.rollno} onChange={(e) => {

                            this.setState({
                                rollno: e.target.value
                            })
                        }} /><br />
                        </div>
                 </div>


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
                                 <label>Complaint</label>
                             </div> 
                             <div className="col-70">


                        <textarea placeholder="Your complaint" name="complaint" value={this.state.complaint} onChange={(e) => {

                            this.setState({
                                complaint: e.target.value
                            })
                        }} ></textarea><br />

                </div>
                 </div>
                        <input type="submit" value="Register it" />
                    </form>
                </main>
               
            </div>
        );
    }
};
export default withRouter(Register);