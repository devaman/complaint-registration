import React, { Component } from 'react';
import "./ComplaintItem.css";
import * as Constants from '../../../utils/Constants'
import ComplaintContract from '../../../../build/contracts/Complaint.json'
import { getWeb3, getContractInstance } from '../../../utils/getWeb3'
import Loader from '../../../components/Loader/Loader.js';
import address from "../../../utils/ContractAddress";
let web3 = getWeb3();
let complaintInstance = getContractInstance(ComplaintContract, address);
class ComplaintItem extends Component {
    state = {
        judge: false,
    }
    async componentDidMount() {
        let cat = parseInt(this.props.cat);
        let sub = parseInt(this.props.sub);
        let judge = await complaintInstance.methods.isJudge(cat, sub).call({ from: this.props.account[0] });

        this.setState({
            judge
        })

    }
    onAccepted = async (e) => {
        let a = await complaintInstance.methods.acceptComplaint(this.props.index).send({ from: this.props.account[0] })
        if(a){
            this.props.updateAcceptedArr(this.props.index,true)
        }

    }
    onClosed = async (e) => {
        let a = await complaintInstance.methods.closeComplaint(this.props.index).send({ from: this.props.account[0] })
        if (a) {
            this.props.updateClosedArr(this.props.index, true)
        }
    }
    render() {
        let date = new Date(parseInt(this.props.timestamp));
        let color = "";
        if (this.props.accepted == "true" && this.props.closed == "true"){
            color="green";
        } else if (this.props.accepted == "true" && !(this.props.closed == "true")){
            color="yellow"
        } else if (!(this.props.accepted == "true") && this.props.closed == "true"){
            color="red"
        }else{

        }
        // var date1 = new Date("7/13/2010");
        var date2 = new Date();
        var timeDiff = Math.abs(date2.getTime() - date.getTime());
        var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24)); 
        console.log(diffDays);
        let serious="";
        if (this.props.accepted == "false" && this.props.closed == "false"&&diffDays>=7){
            serious=" Acceptance Date Passed "
        }
        if (this.props.closed == "false" && this.props.accepted == "true"&&diffDays>=20){
            serious+=" Closing Date Passed "
        }
        if (this.props.closed == "false" && this.props.accepted == "false"&&diffDays>=20){
            serious=" Acceptance and Closing date passed "
        }
        if (this.props.show) {
            return (
                <li className={"ComplaintItem "+(color)}>
                    <label>Name: {this.props.name}</label>
                    <label>RollNo: {this.props.rollno}</label>
                    <label>Category: {Constants.stringify(this.props.cat)}</label>
                    <label>Sub-category: {Constants.stringify(this.props.sub)}</label>
                    <label>Date :  {date.toDateString()}</label>
                    <label>Time :{date.toLocaleTimeString()}</label>
                    <label style={{fontWeight:600}}>Complaint : {this.props.complaint}</label>
                    {/* <label>Accepted : {this.props.accepted}</label> */}
                    {/* <label>Closed : {this.props.closed}</label> */}
                    <label>creator : {this.props.creator}</label>
                    <b>{serious}</b>
                    <div>
                        {this.props.accepted == "false" && this.props.closed == "false" && this.state.judge ?
                            <button onClick={this.onAccepted} id="acceptbtn">Accept</button>
                            : ""}
                        {this.props.closed == "false" && this.state.judge ?
                            <button onClick={this.onClosed} id="closebtn">Close</button>
                            : ""}
                    </div>
                </li>
            );
        }
        else return null;
    };
}
export default ComplaintItem;