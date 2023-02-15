import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Matches from '../database/models/Match.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de Matches', () => {
  afterEach(sinon.restore);

  
  it('01-verifica se a rota /matches sem nenhum filtro retorna todos os jogos.', async () => {
   
    const result = await chai.request(app).get('/matches');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.an('array');
    expect(result.body).to.have.length(48);
  });

  it('02-verifica a aplicação do filtro inProgress na rota /matches.', async () => {
    const resultTrue = await chai.request(app).get('/matches?inProgress=true');
    const resultFalse = await chai.request(app).get('/matches?inProgress=false');

    expect(resultTrue.status).to.be.equal(200);
    expect(resultFalse.status).to.be.equal(200);
    
    expect(resultTrue.body).to.have.length(8);
    expect(resultFalse.body).to.have.length(40);
    
  });  
});
