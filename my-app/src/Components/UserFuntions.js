import axios from 'axios';

export const register = newUser =>{
    return axios
    .post('/register', {
        email: newUser.email,
        password: newUser.password
    })
    .then(res => {
        console.log('Registred!')
    })
}

export const login = user => {
    return axios
    .post('/login', {
        email: user.email,
        password: user.password
    
    })
    .then(res => { 

        localStorage.setItem('userToken', res.data);
        return res.data
    })
    .catch(err => {
        console.log(err)
    })
}




/*
<nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
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
*/