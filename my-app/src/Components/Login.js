import React, {Component} from 'react';
import {login} from './UserFuntions.js';
import fotoperfil from './imagens/avatar.jpg'

class Login extends Component {
    constructor() {
        super()
        this.state= {
            email: '',
            password:''
        }
        
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault()

        const user =  {
            email: this.state.email,
            password: this.state.password
        }

        login(user).then( res => {
            if(res) {
                this.props.history.push('/home')
            }
        })
    }
    render() {
        return (
            <div className="container"> 
                <div className="row">
                    <div className="col-md-6 mt-4 mx-auto"> 
                        <section id="main">
                        
                            <form noValidate onSubmit={this.onSubmit}>
                                <h1 className="h3 mb-5 font-weight-normal">Por favor logar</h1>
                                <header>
                                    <span class="avatar">
                                        <img src={fotoperfil} alt='logo'/>
                                    </span>
                                
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" name="email" placeholder="Enter Email"
                                    value={this.state.email} onChange={this.onChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" placeholder="Enter Password"
                                    value={this.state.password} onChange={this.onChange}/>
                                </div>
                                </header>
                                <button type="submit" className="btn btn-lg btn-primary btn-block">
                                    Logar
                                </button>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login