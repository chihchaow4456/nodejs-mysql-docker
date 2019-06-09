const _ = require('lodash');
const {
    findAllByPage,
    getTotal,
    findUserArticles,
    addArticle,
    findById,
    updateArticle,
    deleteArticle
} = require('../db/dao/article/article');


class Article {
    constructor(){

    }
    
    async findAll(req,res,next){
        try{
            const page = parseInt(req.query.page);

            //  the data starting point and three data to show
            let index = (page-1) * 3;
            const data = 3;
            if(!page || page === 1){
                index = 0;
            }
            const articles = await findAllByPage(index,data);
            res.status(200).json(articles);
        }catch(err){
            res.status(500).end();
        }
    }
    
    async getTotal(req,res,next){
        try{
            const total = await getTotal();
            res.status(200).send(total.toString());
        }catch(err){
            res.status(400).send(err);
        }
    }

    async findByUser(req,res,next){
        try{
            const userId = req.user[0].u_id;
            const articles = await findUserArticles(userId);
            res.status(200).json(articles);
        }catch(err){
            res.status(400).end();
        }
    }

    async addUserArtice(req,res,next){
        try{
            const userId = req.user[0].u_id;
            const body = _.pick(req.body, ['title','content']);

            await addArticle(body.title,body.content,userId);
            res.status(200).end();
        }catch(err){
            res.status(400).send(err);
        }
    }
    
    async getArticle(req,res,next){
        try{
            const articleId = req.query.a_id;
            
            const article = await findById(articleId);
            res.status(200).send(article);
        }catch(err){
            res.status(400).send(err);
        }
    }

    async updateUserArticle(req,res,next){
        try{
            const articleId = req.params.a_id;
            const body = _.pick(req.body, ['title','content']);

            await updateArticle(body.title,body.content,articleId);
            res.status(200).end();
        }catch(err){
            res.status(404).send(err);
        }
    }

    async removeArticle(req,res,next){
        try{
            var articleId = req.params.a_id;
            await deleteArticle(articleId);
            res.status(200).end();
        }catch(err){
            res.status(400).send(err);
        }
    }
}

module.exports = new Article();