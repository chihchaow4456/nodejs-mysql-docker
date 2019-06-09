const mysql = require('mysql');
const mysqladress = require('../../../../config/connect');
const pool = mysql.createPool(mysqladress.config);
var {articleSqlMap} = require('../sqlmap');

const findAllByPage = function(index,data){
    return new Promise((resolve,reject) => {
            pool.query(articleSqlMap.findAllByPage,[index,data],(err,res) => {
                if(err){
                    reject(err);
                }else{
                    resolve(res);
                }
            })
    })
}

/**
 * Show User's Article
 * @param {Number} u_id
 * @return {Promise}
 */
const findUserArticles = function(u_id){
    return new Promise((resolve,reject) => {
        pool.query(articleSqlMap.findUserArticles,[u_id],(err,res) => {
            if(err){
                reject(err);
            }else{
                resolve(res);
            }
        })
    })
}

const getTotal = function(){
    return new Promise((resolve,reject) => {
        pool.query(articleSqlMap.getTotal,(err,res) => {
            if(err){
                reject(err);
            }else{
                resolve(res[0]['COUNT(*)']);    //totalNumber
            }
        })
    })
}

/**
 * Add a article
 * @param {String} title 
 * @param {String} content 
 * @param {String} userId
 * @return {Promise}
 */
const addArticle = function(title,content,userId){
    return new Promise((resolve,reject) => {
        pool.query(articleSqlMap.addArticle, [title,content,userId] , (err,res) => {
            if(err) {
                reject(err);
            }else{
                resolve(res);
            }

        })
    })
}

/**
 * Using article ID and User Id find article
 * @param {Number|String} a_id 
 * @param {Number|String} u_id 
 * @return {Promise}
 */
const findById = function(a_id,u_id){
    return new Promise((resolve,reject) => {
        pool.query(articleSqlMap.findById, [a_id] , (err,res) => {
            err ? reject(err) : resolve(res);
        })
    })
}

/**
 * Edit Article
 * @param {String} title 
 * @param {String} content 
 * @param {Number} a_id 
 * @return {Promise}
 */
const updateArticle = function(title,content,a_id){
    return new Promise((resolve,reject) => {
        pool.query(articleSqlMap.editArticle, [title,a_id,content,a_id,a_id] ,(err,res) => {
            err ? reject(err) : resolve(res);
        })
    })
}

/**
 * Delete Article
 * @param {Number} a_id
 * @return {Promise}
 */
const deleteArticle = function(a_id){
    return new Promise((resolve,reject) => {
        pool.query(articleSqlMap.deleteArticle, [a_id] , (err,res) => {
            err ? reject(err) : resolve(res);
        })
    })
}

module.exports = {
    findAllByPage,
    findUserArticles,
    addArticle,
    findById,
    updateArticle,
    deleteArticle,
    getTotal
}