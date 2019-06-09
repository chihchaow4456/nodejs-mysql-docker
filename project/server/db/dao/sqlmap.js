var userSqlMap = {
    signup: 'INSERT INTO USER (email,name,password) VALUES(?,?,?)',
    login: 'SELECT u_id,email,name FROM USER WHERE email=? AND password=?',
    findToken: 'SELECT u_id,email,name FROM USER WHERE u_id=?',
    //Delete table user and article which contains same u_id
    deleteUser: 'DELETE U,A FROM user U INNER JOIN article A ON U.u_id = A.u_id WHERE U.u_id = ?'
};

var productSqlMap = {
    purchase: 'INSERT INTO PRODUCT (name,price) VALUES(?,?)',
    checkProduct: 'SELECT name FROM PRODUCT WHERE name = ?',
    
};
    
var articleSqlMap = {
    findUserArticles: 'SELECT a_id,title,content,created_on FROM article WHERE u_id = ?',
    addArticle: 'INSERT INTO ARTICLE (title,content,created_on,u_id) VALUES (?,?,now(),?)',
    findById: 'SELECT title,content,created_on FROM ARTICLE WHERE a_id=?',
    findAllByPage: 'SELECT name,a_id,title,content,created_on '
            + 'FROM ARTICLE A INNER JOIN USER U ON '
            + 'U.u_id = A.u_id LIMIT ?,?',
    getTotal: 'SELECT COUNT(*) FROM ARTICLE;',
    getTotalByUser: 'SELECT COUNT(*) FROM ARTICLE WHERE u_id = ?',
    // editArticle: 'UPDATE ARTICLE SET title=?,content=?  WHERE a_id=?',
    deleteArticle: 'DELETE A FROM ARTICLE A INNER JOIN USER U ON U.u_id = A.u_id'
                +   ' where a_id = ?',
    //IF title or content is null,then set original data
    editArticle: 'UPDATE ARTICLE A SET A.title = '
                +   'IFNULL(?,'
                +   '(SELECT title FROM (SELECT title from article WHERE a_id = ?) as title)),'
                +   'A.content = IFNULL(?,'
                +   '(SELECT content FROM (SELECT content from article WHERE a_id = ?) as content))'
                +   'WHERE A.a_id = ?'
}

module.exports = {
    userSqlMap,
    productSqlMap,
    articleSqlMap
};