import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Matches from '../database/models/Match.model';
import { tokenTest } from './mocks/login.mock';
import { Model } from 'sequelize';
import Match from '../database/models/Match.model';
import { inputCreatMatch, matcheMock0 } from './mocks/matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de Matches', () => {
  afterEach(sinon.restore);

  
  it('01-verifica se a rota /matches sem nenhum filtro retorna todos os jogos.', async () => {
    const result = await chai.request(app).get('/matches');
    const listMatches = result.body;

    expect(result.status).to.be.equal(200);
    expect(listMatches).to.be.an('array');
    
    listMatches.forEach((e: Match) => {
      expect(e).to.have.keys(Object.keys(matcheMock0));
    });
  });

  it('02-verifica a aplicação do filtro inProgress na rota /matches.', async () => {
    const resultTrue = await chai.request(app).get('/matches?inProgress=true');
    const resultFalse = await chai.request(app).get('/matches?inProgress=false');

    const listMatchesTrue = resultTrue.body;
    const listMatchesFalse = resultFalse.body;

    expect(resultTrue.status).to.be.equal(200);
    listMatchesTrue.forEach((resTrue: Match) => expect(resTrue.inProgress).to.be.true);

    expect(resultFalse.status).to.be.equal(200);
    listMatchesFalse.forEach((resFalse: Match) => expect(resFalse.inProgress).to.be.false);

  }); 
  
  it('03-verifica se é possível alterar o status inProgress de uma partida para false atraves de /matches/:id/finish.', async () => {
    const result = await chai.request(app).patch('/matches/48/finish');
    
    expect(result.status).to.be.equal(200);
    expect(result.body.message).to.be.equal('Finished');
  });

  it('04-verifica se é possível  salvar uma partida com o status de inProgress como true.', async () => {
    sinon.stub(Match, 'create').resolves({
      "id": 49,
      "homeTeamId": 16,
      "awayTeamId": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
      "inProgress": true
    } as Match)

    const result = await chai.request(app).post('/matches').set('authorization', tokenTest).send(inputCreatMatch);

    expect(result.status).to.be.equal(201);
    expect(result.body.inProgress).to.be.true;
  });

  it('05-verifica se ao tentar salvar uma partida com token invalido se retorna erro', async () => {
    const result = await chai.request(app).post('/matches').set('authorization', 'tokenTestErrado').send(inputCreatMatch);

    expect(result.status).to.be.equal(401);
    expect(result.body.message).to.be.equal('Token must be a valid token');
  });

  it('06-verifica se ao tentar salvar uma partida sem token se retorna erro', async () => {
    const result = await chai.request(app).post('/matches').send(inputCreatMatch);
    expect(result.status).to.be.equal(401);
  });

  it('07-verifica se ao tentar salvar uma partida com times iguais se retorna erro', async () => {
    const result = await chai.request(app).post('/matches').set('authorization', tokenTest).send({
      "homeTeamId": 8,
      "awayTeamId": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2
    });

    expect(result.status).to.be.equal(422);
    expect(result.body.message).to.be.equal('It is not possible to create a match with two equal teams');
  });

  it('08-verifica se ao tentar salvar uma partida com time que não existe se retorna erro', async () => {
    const result = await chai.request(app).post('/matches').set('authorization', tokenTest).send({
      "homeTeamId": 800,
      "awayTeamId": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2
    });

    expect(result.status).to.be.equal(404);
    expect(result.body.message).to.be.equal('There is no team with such id!');
  });

  it('09-verifica se possivel atualizar partidas em andamento', async () => {
    const result = await chai.request(app).patch('/matches/1').set('Authorization', tokenTest).send({
      homeTeamGoals: 2,
      awayTeamGoals: 2
    });
    expect(result.status).to.be.equal(200);
  });
  

});
