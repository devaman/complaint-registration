import React, { Component } from 'react';
import { withRouter } from "react-router";
class Admin extends Component {
    render() {
        return (
            <div>
                <nav className="navbar pure-menu pure-menu-horizontal">
                    <a href="javascript:void(0);" onClick={() => { this.props.history.push('/') }} className="pure-menu-heading pure-menu-link">Complaints</a>
                    <a href="javascript:void(0);" onClick={() => { this.props.history.push('/register') }} className="pure-menu-heading pure-menu-link">Register</a>
                    {this.props.admin ? <a href="javascript:void(0);" onClick={() => { this.props.history.push('/admin') }} className="pure-menu-heading pure-menu-link">Admin</a> : ""}

                </nav>
            </div>
        );
    }
}
export default withRouter(Admin);