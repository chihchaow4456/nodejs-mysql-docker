const mysql = require('mysql');
const mysqlAddress = require('../../../config/connect');
const pool = mysql.createPool(mysqlAddress.config);

const DeleteAll = function(){
    pool.query('DELETE U,A FROM USER U INNER JOIN ARTICLE A ON U.u_id = A.u_id', (err,res) => {
        if(err){
            console.log(err);
        }
    });
}

const DeleteUser = function(){
    pool.query('DELETE FROM USER',(err,res) => {
        if(err)
        {
            console.log(err);
        }
    })
}
const findByArticleId = function(a_id){
    return new Promise((resolve,reject) => {
        pool.query('SELECT * FROM ARTICLE WHERE a_id = ?',a_id,(err,res) => {
            err ? reject(err) : resolve(res);
        });
    });
};


module.exports = {
    findByArticleId,
    DeleteAll,
    DeleteUser
};