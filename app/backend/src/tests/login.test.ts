import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import userModel from '../database/models/User.model';
import { tokenTest, UserTestInvalid, UserTestValid } from './mocks/login.mock';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de Login', () => {
  afterEach(sinon.restore);

  it('01-verifica se tentar fazer o login sem e-mail retornará status não-autorizado.', async () => {
    const result = await chai.request(app).post('/login').send({ password: UserTestInvalid.password });  

    expect(result.status).to.be.equal(400);
    expect(result.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('02-verifica se tentar fazer o login sem senha retornará status não-autorizado.', async () => {
    const result = await chai.request(app).post('/login').send({ email: UserTestInvalid.email });

    expect(result.status).to.be.equal(400);
    expect(result.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('03-Não é possível realizar o login com dados incorretos.', async () => {
    const result = await chai.request(app).post('/login').send({ email: UserTestInvalid.email, password: UserTestInvalid.password });

    expect(result.status).to.be.equal(401);
    expect(result.body).to.be.deep.equal({ message: 'Incorrect email or password' });
  });

  it('04-Não é possível realizar o login com formato de e-mail incorreto.', async () => {
    const result = await chai.request(app).post('/login').send({ email: "user.com", password: UserTestInvalid.password });

    expect(result.status).to.be.equal(401);
    expect(result.body).to.be.deep.equal({ message: 'Incorrect email or password' });
  });

  it('05-verifica se fazer o login com uma senha incorreta retornará status não-autorizado.', async () => {
    const result = await chai.request(app).post('/login').send({ email: UserTestValid.email, password: "123456" });

    expect(result.status).to.be.equal(401);
    expect(result.body).to.be.deep.equal({ message: 'Incorrect email or password' });
  });

  it('06-Se não houver o Authorization retornará status não-autorizado', async () => {
  
    const result = await chai.request(app).get('/login/validate');
    expect(result.status).to.be.equal(401);
    expect(result.body.message).to.have.equal('Token not found');
    
  });

  it('07-verifica se é possível fazer o login com dados corretos.', async () => {
   
    const result = await chai.request(app).post('/login').send({ email: UserTestValid.email, password: "secret_admin" });

    expect(result.status).to.be.equal(200);
    expect(result.body).to.have.property('token');
  });

  it('08-Rota validate retorna a role do usuário', async () => {
    
    const result = await chai.request(app).get('/login/validate').set('Authorization', tokenTest);
    
    expect(result.status).to.be.equal(200);
    expect(result.body).to.have.property('role');
    expect(result.body.role).to.have.equal('admin');
  });
});
