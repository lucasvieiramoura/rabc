const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {roles} = require('../roles')

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

exports.register = async (req, res, next ) => {
    try {
        const { name, email, password, role } = req.body
        const hashedPassword = await hashPassword(password);
        const userData = new User ({ name, email, password: hashedPassword, role: role || "basic"});
        const accessToken = jwt.sign({ userId: userData._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        userData.accessToken = accessToken;
        await userData.save();
        res.json({
            data: userData,
            accessToken
        })
    } catch (error){
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        
        User.findOne({ email : req.body.email })

        .then( user => {
            if(user) {
                if(bcrypt.compareSync(req.body.password, user.password)){
                    const paypload = {
                        _id: user._id,
                        name: user.name,
                        email: user.email
                    }
                    const accessToken = jwt.sign(paypload, process.env.JWT_SECRET, {
                        expiresIn: '1d'
                    });
                    User.findOneAndUpdate(user._id,{ accessToken});
                
                    res.send(accessToken)
                } else {
                    res.json({error: "Senha incorreta"})
                }
            } else {
                res.json({error: "Email incorreto"})
            }
        })
        
        
    } catch (error){
        next(error);
    }
}

exports.getUsers = async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
        data: users
    });
}

exports.getUser = async (req, res, next) => {
    try{
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if  (!user) return next(new Error('Não existe o usuário'));
        res.satus(200).json({
            data: user
        });
    } catch (error) {
        next (error)
    }
}

exports.getProfile = async (req, res) =>{
    try{
    const email = req.body.email;
    
    const user = await User.findOne({email})
    const pwdemail = await validatePassword(password, user.password);
    if (!pwdemail) return next (new Error('Password email não está correto!'))
    if  (!user) return next(new Error('Não existe o usuário'));
        res.status(200).json({
            data: {name,email}
        });
    }
    catch(err) {
        res.send('error:' + err)
    }
}

exports.updateUser = async (req, res, next) => {
    try{
        const update = req.body;
        const userId = req.params.userId;
        await User.findByIdAndUpdate(userId, update);
        const user = await User.findById(userId)
        res.status(200).json({
            data: user,
            message: 'Usuário foi atualizado'
        });
    } catch (error) {
        next(error)
    }
}

exports.deleteUser = async (req, res, next) => {
    try{
        const userId = req.params.userId;
        await User.findByIdAndDelete(userId);
        res.status(200).json({
            data: this.getUsers,
            message: 'Usuário foi apagado'
        });
    } catch (error) {
        next(error)
    }
}

exports.grantAccess = function(action, resource) {
    return async (req, res, next) => {
        try{
            const permission = roles.can(req.user.role)[action](resource);
            if (!permission.granted) {
                return res.status(401).json({
                    error: "Você não tem permissão suficiente para está ação"
                });
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}
exports.allowIfLoggedin = async (req, res, next) => {
    try {
        const user = res.locals.loggedInUser;
        if (!user)
        return res.status(401).json({
            error: "Você precisa está logado para acessar está página"
        });
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}
