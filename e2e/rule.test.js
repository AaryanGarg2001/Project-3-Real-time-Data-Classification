import { app } from '../src/main.ts';
import chaiHttp from 'chai-http';

let chai;
let expect;
let token;
let ruleId;

(async () => {
  chai = await import('chai');
  chai.use(chaiHttp);
  expect = chai.expect;

  describe('Rule Tests', () => {
    before((done) => {
      // Login to get a token
      chai.request(app)
        .post('/login')
        .send({
          email: 'testuser@example.com',
          password: 'testpassword'
        })
        .end((err, res) => {
          token = res.body.data.token;
          done();
        });
    });

    it('should create a new rule', (done) => {
      chai.request(app)
        .post('/rules')
        .set('Authorization', `Bearer ${token}`)
        .send({
          rule: 'max(count("a"),count("b"))<10'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Rule created successfully');
          ruleId = res.body.data._id;
          done();
        });
    });

    it('should evaluate data against a rule', (done) => {
      chai.request(app)
        .post('/rules/evaluate')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ruleId,
          data: 'aaryan is boss'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message', 'Rule evaluation successful');
          expect(res.body.data).to.have.property('result', true);
          done();
        });
    });
  });
})();
