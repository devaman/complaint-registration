import React from 'react';
import ComplaintItem from './ComplaintItem/ComplaintItem';
import './ComplaintItems.css'
const ComplaintItems = (props) => {
    let complaints = [];
    for (let index = 0; index < props.cat.length; index++) {
        const creator = props.creator[index];
        const name = props.name[index];
        const rollno = props.rollno[index];
        const cat = props.cat[index];
        const sub = props.sub[index];
        const timestamp = props.timestamp[index];
        const complaint = props.complaint[index];
        const accepted = props.accepted[index].toString();
        const closed = props.closed[index].toString();
        const show = props.show[index];
        complaints.push(
            <ComplaintItem updateAcceptedArr={props.updateAcceptedArr} updateClosedArr={props.updateClosedArr} index={index} account = {props.account} creator={creator} name={name} rollno={rollno} cat={cat}
            sub={sub} timestamp={timestamp} complaint={complaint} accepted={accepted} closed={closed} show={show}/>
        )

    }
    return (<ul className="ComplaintItems">{complaints}</ul>);
};
export default ComplaintItems;