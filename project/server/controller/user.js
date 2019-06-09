const _ = require('lodash');
const validator = require("validator");
const {signup,findByCredentials,generateTokenAndSetCacheUser,deleteToken} = require('../db/dao/user/user');

class User {
    constructor(){
        
    }
    
    async signup(req,res,next){
        const body = _.pick(req.body, ['email','name','password']);
        try{
            if(!validator.isEmail(body.email)){
                throw 'Email is not Valid'
            }
            let successMsg = await signup(body.email,body.name,body.password);
            res.status(200).send(successMsg);
        }catch(err){
            res.status(400).send(err);
        }
    }

    async signin(req,res,next){
        const body = _.pick(req.body, ['email','password']);
        try{
            if(!validator.isEmail(body.email)){
                throw 'Email is not Valid'
            }
            let user = await findByCredentials(body.email,body.password)
            if(user == ""){
                throw "account or password is wrong"
            }
            if(user){
                let token = await generateTokenAndSetCacheUser(user);
                res.cookie('x-auth',token,{maxAge: 60*60*1000*24 });
                res.header('x-auth',token).send(token);
            }
        }catch(err){
            res.status(400).send(err);
        }
    }

    async logout(req,res,next){
        try{
            await deleteToken(req.token);
            res.status(200).end();
        }catch(err){
            res.status(500).end();
        }
    }

}

module.exports = new User();