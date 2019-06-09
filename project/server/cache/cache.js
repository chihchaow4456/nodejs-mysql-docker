var redis = require("redis"),
    RDS_PORT = 6379,
    RDS_HOST = 'redis',
    RDS_PWD = '1234',
    client = redis.createClient(RDS_PORT,RDS_HOST);
const TIME_TO_LIVE = 60*60*1000*24;     //24hr

client.auth(RDS_PWD,function() {
    console.log("auth 通過");
});

/**
 * set value of cache
 * @param {String} key 
 * @param {String} value
 * @param {number} time - time to live
 * @param {function} callback - return true or err
 * @callback return true or error
 */
const set = function(key,value,time,callback){
    var timeToLive = time || TIME_TO_LIVE;

    client.setex(key,parseInt(timeToLive/1000),value,(err,reply) => {
        if(err) callback(err);

        if(reply){
            callback(null,true)
        }else{
            callback(new Error(`can't set ${key} in redis`));
        }
    });
}

/**
 * use key to get value of cache from redis
 * @param {String} key
 * @param {function} callback - return data
 */
const get =  function(key,callback){
    client.get(key,(err,reply) => {
        if(err){
            callback(err);
        }
        if(reply){
            callback(null,reply);
        }else{
            callback(new Error(`there is no ${key} in redis`));
        }
    })
}

const del = function(key){
    client.del(key)
}

module.exports = {
    set,get,del
}