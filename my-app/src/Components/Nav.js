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
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/login" className="nav-link"> Login </Link>
                </li>
            </ul>
        )
    
        const userLink = (

            <ul className="navbar-nav">
                <li className="nav-item">
                <Link to="/profile" className="nav-link">Perfil</Link>
                </li>
                <li className="nav-item">
                    <a href="/#" onClick={this.logOut.bind(this)} className="nav-link"> Logout </a>
                </li>
            </ul>
        )
        return(
            <div id='right' className={rightOpen} >
                <div className='icon'
                    onClick={this.toggleSidebar} >
                    &equiv;
                </div>
                <div className={`sidebar ${rightOpen}`} >
                    <div className='header'>
                    <h3 className='title'>
                        Right header
                    </h3>
                    </div>
                    <div className='content'>
                        <h3>Right content</h3><br/>
                        <p>
                        Mauris velit turpis, scelerisque at velit sed, porta varius tellus. Donec mollis faucibus arcu id luctus. Etiam sit amet sem orci. Integer accumsan enim id sem aliquam sollicitudin. Etiam sit amet lorem risus. Aliquam pellentesque vestibulum hendrerit. Pellentesque dui mauris, volutpat vel sapien vitae, iaculis venenatis odio. Donec vel metus et purus ullamcorper consequat. Mauris at ullamcorper quam, sed vehicula felis. Vestibulum fringilla, lacus sit amet finibus imperdiet, tellus massa pretium urna, non lacinia dui nibh ut enim. Nullam vestibulum bibendum purus convallis vehicula. Morbi tempor a ipsum mattis pellentesque. Nulla non libero vel enim accumsan luctus.
                        </p>
                    </div>
                </div>
            </div>
        )

    }
}

export default withRouter(Nav)