import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import teamsModel from '../database/models/Team.model';
import { tokenTest, UserTestInvalid, UserTestValid } from './mocks/login.mock';



chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de Login', () => {
  afterEach(sinon.restore);

  
  it('01-verifica se a rota /teams retorna uma array com a lista de times.', async () => {
   
    const result = await chai.request(app).get('/teams');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.an('array');
  });

  it('02-verifica se a rota /teams:id retorna o time correto', async () => {
    const result = await chai.request(app).get('/teams:id');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.have.property('id');
    expect(result.body).to.have.property('teamName');
    
  });
});