import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Match from '../database/models/Match.model';
import leaderBoardMock from './mocks/leaderBoard.mock';
import ILeaderboard from '../interfaces/ILeaderboard';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de leaderBoard', () => {
  afterEach(sinon.restore);
  
  it('01-verifica a rota /leaderboard/home.', async () => {
    const result = await chai.request(app).get('/leaderboard/home');
    const listLeaderBoard = result.body;
   
    expect(result.status).to.be.equal(200);
    expect(listLeaderBoard).to.be.an('array');
     
    listLeaderBoard.forEach((e: ILeaderboard) => {
      expect(e).to.have.keys(Object.keys(leaderBoardMock));
    });
  });

  it('02-verifica a rota /leaderboard/away.', async () => {
    const result = await chai.request(app).get('/leaderboard/away');
    const listLeaderBoard = result.body;

    expect(result.status).to.be.equal(200);
    expect(listLeaderBoard).to.be.an('array');
    
    listLeaderBoard.forEach((e: ILeaderboard) => {
      expect(e).to.have.keys(Object.keys(leaderBoardMock));
    });
  });

});
