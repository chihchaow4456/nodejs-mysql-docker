const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const mysqladdress = require('../../../../config/connect');
const pool = mysql.createPool(mysqladdress.config);
const redis = require('../../../cache/cache');
var {userSqlMap} = require('../sqlmap');
pool.getConnection((err,conn) => {
    if(err){
        console.log(err);
    }else{
        console.log('connection');
    }
}) 
/**
 * Signup
 * @param {Object} user 
 * @return {Promise}
 */
const signup = function(email,name,password){
    return new Promise((resolve,reject) => {
        pool.query(userSqlMap.signup, [email,name,password], (err,res) =>{
            if (err) {
                reject(err);
            }
            else {
                resolve('You have signed up successfully!');
            }
        });
    });
}

/**
 * Verify token
 */
const findByToken = function(token){
    return new Promise((resolve,reject) => {
        try{
        const decoded = jwt.verify(token, process.env.PUBLIC_KEY);

        pool.query(userSqlMap.findToken, [decoded.userId], (err,res) => {
            if(err) {
                console.log('query');
                reject(err);
            }
            else {
                resolve(res);
                }
            });
        }
        catch(err){
            reject(err);
        }
    });
}

const findByCredentials = function(email,password) {
    return new Promise((resolve,reject) => {
        pool.query(userSqlMap.login, [email,password], (err,res) => {
            if (err) {
                console.log('err',err);
                reject(err);
            }
            else {
                resolve(res);
            }
        })
    });
}

const generateTokenAndSetCacheUser = function(user) {
    return new Promise((resolve,reject) => {
        const access = 'auth';

        const userObject = {
            u_id:user[0].u_id,
            email:user[0].email,
            name:user[0].name,
            IsArticleAppend: false
        };
        
        const token = jwt.sign({userId: user[0].u_id,access},process.env.PRIVATE_KEY
        ,{algorithm: 'RS256',expiresIn: 60*60*24 }).toString();

        redis.set(token,JSON.stringify(userObject), 1000 * 60 * 60 * 24, (err,success) => {
            if(err){
                reject(err);
            }
            if(success){
                resolve(token);
            }else{
                reject(new Error('Unknown Error'));
            }
        });
    });
}

/**
 * delete Token to Logout
 * @param {String} token 
 */
const deleteToken = function(token) {
    return new Promise((resolve,reject) => {
        redis.get(token,(err,reply) => {
            if(err){
                reject(err);
            }
            if(reply){
                redis.del(token);
                resolve(reply);
            }
        })
    })

}

module.exports = {
    signup,
    findByToken,
    findByCredentials,
    generateTokenAndSetCacheUser,
    deleteToken
}