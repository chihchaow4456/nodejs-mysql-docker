const app = require('../server');
const Test = require('./seed/seed');
const expect = require('expect');
const request = require('supertest');
const userData = require('./seed/user.json');
const articleData = require('./seed/article.json');

Test.DeleteUser();

describe('post /signup', () => {
    it('should signup' , (done) => {

        request(app)
        .post('/signup')
        .send(userData)
        .expect(200)
        .expect((res) => {
            expect(res.text).toBe('You have signed up successfully!');
        })
        .end(done);

    });

    it('should not signup an exist email', (done) => {
        request(app).post('/signup').send(userData)
        .expect(400).end(done);
    });
})

describe('post /signin', () => {
    it('should signin', (done) => {

        request(app)
        .post('/signin')
        .send({email: userData.email,password:userData.password})
        .expect((res) => {
            this.token = res.header['x-auth'];
            expect(res.header['x-auth']).toBeTruthy();
        }).end(done);
    });

    it('should not signin while password is wrong',(done) => {

        request(app)
        .post('/signin')
        .send({email: userData.email,password:userData.password+'fail'})
        .expect(400).end(done);
    });
})
/**
 * expect response res.body[0] is match to jack found by token
 */
describe('get /user', () => {
    it('should get user', (done) => {
        request(app)
        .get('/user')
        .set('x-auth',this.token)
        .expect(200)
        .expect((res) => {
            // console.log(res.body);
            this.u_id = res.body[0].u_id;
            expect(userData.name).toBe(res.body[0].name);
        }).end(done);
    });
    it('should not get user without token', (done) => {
        request(app)
        .get('/user')
        .expect(401)
        .expect((res) => {
            expect(res.text).toBe('Unauthorized. Redirecting to /signin');
        })
        .end(done);
    });
})

describe('post /article', () => {
   
    it('should add article', (done) => {
        request(app)
        .post('/user/article')
        .set('x-auth', this.token)
        .send({
            title: articleData[0].title,
            content: articleData[0].content
        })
        .expect(200)
        .end(done);
    });

    it('should not add article without token', (done) => {
        request(app)
        .post('/user/article')
        .send({
            title: articleData[0].title,
            content: articleData[0].content
        })
        .expect(401)
        .expect((res) => {
            expect(res.text).toBe('Unauthorized. Redirecting to /signin');
        })
        .end(done);
    });
})

describe('get /user/articles', () => {

    it('should get all articles', (done) => {
        request(app)
        .get('/user/articles')
        .set('x-auth', this.token)
        .expect(200)
        .expect((res) => {
            this.a_id = res.body[0].a_id;
            expect(res.body[0].title).toBe(articleData[0].title);
            expect(res.body[0].content).toBe(articleData[0].content);
        })
        .end(done);
    });
    
    it('should not get all articles without token', (done) => {
        request(app).get('/user/articles')
        .expect(401)
        .expect((res) => {
            expect(res.text).toBe('Unauthorized. Redirecting to /signin');
        })
        .end(done);
    });
})

describe('get /user/article', () => {
    it('should get one article', (done) => {
        request(app).get('/user/article')
        .set('x-auth',this.token)
        .query({ a_id: this.a_id})
        .expect(200)
        .expect((res) => {
            expect(res.body[0].title).toBe(articleData[0].title);
            expect(res.body[0].content).toBe(articleData[0].content);
            expect(res.body[0].created_on).toBeTruthy();
        }).end(done);
    });

    it('should not get article without token' ,(done) => {
        request(app).get('/user/article')
        .query({ a_id: this.a_id})
        .expect(401)
        .expect((res) => {
            expect(res.text).toBe('Unauthorized. Redirecting to /signin');
        })
        .end(done);
    });
})

describe('patch /user/article/:a_id', () => {
    const Modifytitle = 'Modified title';
    const Modifycontent = 'Modified content';

    after((done) => {
        Test.findByArticleId(this.a_id).then((res) => {
            expect(res[0].title).toBe(Modifytitle);
            expect(res[0].content).toBe(Modifycontent);
            done();
        })
    });

    it('should only update created_on of article', (done) => {
        request(app).patch(`/user/article/${this.a_id}`)
        .set('x-auth',this.token)
        .send({}).expect(200).end(done);
    });
    
    it('should update the title of article', (done) => {
        request(app).patch(`/user/article/${this.a_id}`)
        .set('x-auth',this.token)        
        .send({title: Modifytitle}).expect(200).end(done);
    });
    
    it('should update the content of article', (done) => {
        request(app).patch(`/user/article/${this.a_id}`)
        .set('x-auth',this.token)
        .send({content: Modifycontent}).expect(200).end(done);
    });

    it('should update title and content', (done) => {
        request(app).patch(`/user/article/${this.a_id}`)
        .set('x-auth',this.token)
        .send({
            title: Modifytitle,
            content: Modifycontent
        })
        .expect(200).end(done);
    });
})

describe('delete /user/article/:a_id' , () => {
    after((done) => {
        Test.findByArticleId(this.a_id).then((res) =>{
            expect(res).toEqual([]);
            done();
        })
    })
    it('should delete article', (done) => {
        request(app).delete(`/user/article/${this.a_id}`)
        .expect(200).end(done);
    })
});