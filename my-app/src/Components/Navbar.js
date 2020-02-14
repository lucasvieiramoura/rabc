import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import logoLafa from './imagens/logo.png'

class Navbar extends Component{

    logOut(e){
        e.preventDefault()
        localStorage.removeItem('userToken')
        this.props.history.push('/')
    }

    render() {
        const loginRegLink = (
            <ul className="links">
                <li>
                    <a to="/login"> Login </a>
                </li>
            </ul>
        )
    
        const userLink = (

            <ul className="links">
                <li>
                <a to="/profile">Perfil</a>
                </li>
                <li>
                    <a href="/#" onClick={this.logOut.bind(this)}> Logout </a>
                </li>
            </ul>
        )
            
        return (

            <nav id="menu">
                <ul className="links">
                    <li>
                        <Link to="/" className="icon fa-home">
                            Home
                        </Link>
                    </li>
                </ul>
                {localStorage.userToken ? userLink : loginRegLink}
            </nav>
        )
    }
}

export default withRouter(Navbar)