import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';
import UserService from '../services/UserService';

chai.use(chaiHttp);

const { expect } = chai;

// Mentoria do Ivan de TDD foi muito valiosa pra esse projeto.

describe('Test POST /login', () => {
  it('Caso email nao for informado, retorna status 400', async () => {
    const httpResponse: Response = await chai.request(app).post('/login').send({ password: 'test' });
    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: "All fields must be filled" });
  });

  it('Caso senha nao for informado, retorna status 400', async () => {
    const httpResponse: Response = await chai.request(app).post('/login').send({ email: 'test' });
    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: "All fields must be filled" });
  });

  it('Caso email ou senha forem invalidos', async () => {
    sinon.stub(User, 'findOne').resolves(null)

    const httpResponse: Response = await chai.request(app).post('/login').send({ email: 'test', password: 'test' });
    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ message: "Incorrect email or password" });

    sinon.restore();
  });

  it('Caso login com sucesso', async () => {
    const user = {
      id: 1,
      username: 'test',
      role: 'test',
      email: 'test',
      password: 'test',
    }
    sinon.stub(User, 'findOne').resolves(user as User);
    sinon.stub(UserService, 'checkPassword').returns(true); // https://stackoverflow.com/questions/38218107/how-to-stub-static-methods-with-sinon-in-es6

    const httpResponse: Response = await chai.request(app).post('/login').send({ email: 'test', password: 'test' });
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.have.a.key('token')
    expect(httpResponse.body.token).to.be.a('string');

    sinon.restore();
  });

  it('Caso token for invalido', async () => {
    const httpResponse: Response = await chai.request(app).get('/login/validate');
    expect(httpResponse.status).to.be.equal(403);
    expect(httpResponse.body).to.be.deep.equal({ message: "Invalid token" });
  });

  it('Caso token for valido', async () => {
    const user = {
      id: 1,
      username: 'test',
      role: 'test',
      email: 'test',
      password: 'test',
    }
    sinon.stub(User, 'findOne').resolves(user as User);
    sinon.stub(UserService, 'checkPassword').returns(true);

    const httpResponse: Response = await chai.request(app).post('/login').send({ email: 'test', password: 'test' });
    const httpResponseAut: Response = await chai.request(app).get('/login/validate').set('Authorization', httpResponse.body.token);
    expect(httpResponseAut.status).to.be.equal(200);
    expect(httpResponseAut.body).to.be.deep.equal({ role: 'test' });

    sinon.restore();
  });

  
});
