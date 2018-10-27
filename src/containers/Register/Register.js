import React, { Component } from 'react';
import ComplaintContract from '../../../build/contracts/Complaint.json'
import { getWeb3, getContractInstance } from '../../utils/getWeb3'
import Loader from '../../components/Loader/Loader.js';
let web3 = getWeb3();
let complaintInstance = getContractInstance(ComplaintContract, "0x7a5319b48ccb683501a253d2482a366e78e50ac2")
class Register extends Component {

    state = {
        name: "",
        rollno: "",
        cat: "",
        sub: "",
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
            <div>
                {this.state.load ? <Loader /> : ""}

                <h6>{this.state.msg}</h6>
                <form onSubmit={this.onFormSubmit}>
                    <input type="text" placeholder="Name" name="name" value={this.state.name} onChange={(e) => {
                        this.setState({
                            name: e.target.value
                        })
                    }} /><br />
                    <input type="text" placeholder="RollNo" name="rollno" value={this.state.rollno} onChange={(e) => {

                        this.setState({
                            rollno: e.target.value
                        })
                    }} /><br />
                    <input type="text" placeholder="Category" name="cat" value={this.state.cat} onChange={(e) => {

                        this.setState({
                            cat: e.target.value
                        })
                    }} /><br />
                    <input type="text" placeholder="Sub-Cat" name="sub" value={this.state.sub} onChange={(e) => {

                        this.setState({
                            sub: e.target.value
                        })
                    }} /><br />
                    <input type="text" placeholder="Your complaint" name="complaint" value={this.state.complaint} onChange={(e) => {

                        this.setState({
                            complaint: e.target.value
                        })
                    }} /><br />
                    <input type="submit" value="Register it"/>
                </form>
            </div>
        );
    }
};
export default Register;