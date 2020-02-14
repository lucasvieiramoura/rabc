import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

class Navbar extends Component{
    logOut(e){
        e.preventDefault()
        localStorage.removeItem('userToken')
        this.props.history.push('/')
    }

    render() {
        const loginRegLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/login" className="nav-link"> Login </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link"> Cadastrar</Link>
                </li>
            </ul>
        )
    
        const userLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/profile" className="nav-link"> User </Link>
                </li>
                <li className="nav-item">
                    <a href="/#" onClick={this.logOut.bind(this)} className="nav-link"> Logout </a>
                </li>
            </ul>
        )
            
        return (
            < nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
                <button className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbar1"
                aria-controls="navabar1"
                aria-expanded="false"
                aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbar1">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="navbar-brand nav-link">
                                Home
                            </Link>
                        </li>
                    </ul>
                    {localStorage.userToken ? userLink : loginRegLink}
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar)