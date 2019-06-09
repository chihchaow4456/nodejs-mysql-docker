var User = require('../db/dao/user/user')
const redis = require('../cache/cache');

var authenticate = (req,res,next) => {
    var token = req.header('x-auth');
    if(token){
        redis.get(token,(err,reply) => {
            if(err || !reply){
                res.status(401).end();
            }else{
                User.findByToken(token).then((user) => {
                    if(user == ""){
                        console.log('no user');
                        return Promise.reject();
                    }
                    req.user = user;
                    req.token = token; //used in logout
                    next();
                }).catch(() => {
                    res.redirect(401,'/signin');
                })
            }
        })
    }else{
        res.redirect(401,'/signin');
    }
}

module.exports = {
    authenticate
};