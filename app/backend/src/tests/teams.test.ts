import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de Teams', () => {
  afterEach(sinon.restore);

  
  it('01-verifica se a rota /teams retorna uma array com a lista de times.', async () => {
    const result = await chai.request(app).get('/teams');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.an('array');
  });

  it('02-verifica se a rota /teams/:id retorna o time correto', async () => {
    const result = await chai.request(app).get('/teams/7');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.have.property('id');
    expect(result.body).to.have.property('teamName');
    expect(result.body.id).to.be.deep.equal(7);
    expect(result.body.teamName).to.be.deep.equal('Flamengo');
    
  });

  it('03-verifica se ao usar a rota /teams/:id com um id invalido se retorna um erro', async () => {
    const result = await chai.request(app).get('/teams/20');

    expect(result.status).to.be.equal(401);
    expect(result.body).to.have.property('message');
    expect(result.body).to.have.property('result');
    expect(result.body.message).to.be.equal("Não há time cadastrado com esse ID");
    expect(result.body.result).to.be.equal(null);
    
  });
});