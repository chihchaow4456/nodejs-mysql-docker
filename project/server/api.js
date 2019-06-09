const express = require('express');
const _ = require('lodash');
const router = express.Router();
const {authenticate} = require('./middleware/authenticate');
const User = require('./controller/user');
const Article = require('./controller/article');

router.post('/signup', User.signup);

router.post('/signin', User.signin);

router.get('/user',authenticate, (req,res) => {
    res.send(req.user).status(200).end();
})

router.get('/articles',authenticate, Article.findAll);

router.get('/totalArticle', Article.getTotal)

router.get('/user/articles/', authenticate, Article.findByUser);

router.post('/user/article', authenticate, Article.addUserArtice);

router.get('/user/article', authenticate, Article.getArticle);

router.patch('/user/article/:a_id', authenticate, Article.updateUserArticle);

router.delete('/user/article/:a_id', Article.removeArticle);

router.delete('/user/token', authenticate, User.logout)

module.exports = router