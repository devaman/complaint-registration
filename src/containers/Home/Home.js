import React, { Component } from 'react';
import ComplaintContract from '../../../build/contracts/Complaint.json'
import Loader from "../../components/Loader/Loader";
import { getWeb3, getContractInstance } from '../../utils/getWeb3'
let web3 = getWeb3();
let complaintInstance = getContractInstance(ComplaintContract, "0x7a5319b48ccb683501a253d2482a366e78e50ac2")

class Home extends Component {

    state = {
        storageValue: 0,
        accounts: null,
        load: true,
        complaints:{
            name: [],
            rollno: [],
            cat: [],
            sub: [],
            complaint: [],
            timestamp: 0,
        }
    }

    async componentWillMount() {

        let accounts = await web3.eth.getAccounts();
        let cmp1 = await complaintInstance.methods.getAllValuesComplaints().call();
        let cmp2 = await complaintInstance.methods.getAllValuesCreators().call();
        cmp1[3] = cmp1[3].map((i)=>{
            return web3.utils.toAscii(i)
        })
        cmp2[1] = cmp2[1].map((i)=>{
            return web3.utils.toAscii(i)
        })
        cmp2[2] = cmp2[2].map((i)=>{
            return web3.utils.toAscii(i)
        })
        
        this.setState({
            accounts,
            complaints:{
                creator:cmp2[0],
                name:cmp2[1],
                rollno:cmp2[2],
                cat:cmp1[0],
                sub:cmp1[1],
                timestamp:cmp1[2],
                complaint:cmp1[3],
                accepted:cmp1[4],
                closed:cmp1[5]
                
            },
            load:false
        })
        


    }
    renderComplaints=()=>{
        let complaints=[];
        for (let index = 0; index < this.state.complaints.cat.length; index++) {
            const creator = this.state.complaints.creator[index];
            const name = this.state.complaints.name[index];
            const rollno = this.state.complaints.rollno[index];
            const cat = this.state.complaints.cat[index];
            const sub = this.state.complaints.sub[index];
            const timestamp = this.state.complaints.timestamp[index];
            const complaint = this.state.complaints.complaint[index];
            const accepted = this.state.complaints.accepted[index].toString();
            const closed = this.state.complaints.closed[index].toString();
            complaints.push(
                <li>
                    <h4>creator: {creator}</h4>
                    <h4>Name: {name}</h4>
                    <h4>RollNo: {rollno}</h4>
                    <h4>Category: {cat}</h4>
                    <h4>Sub-category: {sub}</h4>
                    <h4>Time :{timestamp}</h4>
                    <h4>Complaint: {complaint}</h4>
                    <h4>Accepted: {accepted}</h4>
                    <h4>Closed: {closed}</h4>
                </li>
            )
            
        }
        console.log(complaints);
        
        return complaints;
    }
    render() {
        
    
            return (
                <div className="App">
                    {this.state.load ? <Loader /> : ""}

                    <nav className="navbar pure-menu pure-menu-horizontal">
                        <a href="#" className="pure-menu-heading pure-menu-link">Complaints</a>
                    </nav>

                    <main className="container">
                            <div className="pure-u-1-1">
                                {this.state.accounts}
                            </div>
                            <ui>
                                {this.renderComplaints()}
                            </ui>
                    </main>
                </div>
            );
    };
};
export default Home;