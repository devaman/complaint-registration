import React from 'react';
import "./ComplaintItem.css";
import * as Constants from '../../../utils/Constants'

const ComplaintItem = (props) => {
    let date = new Date(parseInt(props.timestamp));
    if (props.show) {
        return (
            <li className="ComplaintItem">
                <label>Name: {props.name}</label>
                <label>RollNo: {props.rollno}</label>
                <label>Category: {Constants.stringify(props.cat)}</label>
                <label>Sub-category: {Constants.stringify(props.sub)}</label>
                <label>Date :  {date.toDateString()}</label>
                <label>Time :{date.toLocaleTimeString()}</label>
                <label>Complaint : {props.complaint}</label>
                <label>Accepted : {props.accepted}</label>
                <label>Closed : {props.closed}</label>
                <label>creator : {props.creator}</label>
            </li>
        );
    }
    else return null;
};
export default ComplaintItem;