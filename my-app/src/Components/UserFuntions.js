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




