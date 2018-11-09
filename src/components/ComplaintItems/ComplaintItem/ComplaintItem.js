import React, { Component } from 'react';
import "./ComplaintItem.css";
import * as Constants from '../../../utils/Constants'

class ComplaintItem extends Component {
    state={
        judge:false
    }
    async componentDidMount(){
        // let judge = await 
    }
    render() {
        let date = new Date(parseInt(this.props.timestamp));
        if (this.props.show) {
            return (
                <li className="ComplaintItem">
                    <label>Name: {this.props.name}</label>
                    <label>RollNo: {this.props.rollno}</label>
                    <label>Category: {Constants.stringify(this.props.cat)}</label>
                    <label>Sub-category: {Constants.stringify(this.props.sub)}</label>
                    <label>Date :  {date.toDateString()}</label>
                    <label>Time :{date.toLocaleTimeString()}</label>
                    <label>Complaint : {this.props.complaint}</label>
                    <label>Accepted : {this.props.accepted}</label>
                    <label>Closed : {this.props.closed}</label>
                    <label>creator : {this.props.creator}</label>
                    {this.props.accepted == "false"&&this.state.judge ?  <div>
                        <button>Accept</button>
                        <button>Reject</button>
                    </div>:""}

                </li>
            );
        }
        else return null;
    };
}
    export default ComplaintItem;