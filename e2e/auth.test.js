import { app } from '../src/main.ts';
import chaiHttp from 'chai-http';

let chai;
let expect;

(async () => {
  chai = await import('chai');
  chai.use(chaiHttp);
  expect = chai.expect;

  describe('Auth Tests', () => {
    it('should register a new user', (done) => {
      chai.request(app)
        .post('/register')
        .send({
          username: 'testuser',
          email: 'testuser@example.com',
          password: 'testpassword'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'user registration successful');
          done();
        });
    });

    it('should login an existing user', (done) => {
      chai.request(app)
        .post('/login')
        .send({
          email: 'testuser@example.com',
          password: 'testpassword'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'user login successful');
          expect(res.body.data).to.have.property('token');
          done();
        });
    });
  });
})();
