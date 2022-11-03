import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import Team from '../database/models/Team';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test /teams', async () => {
    it('Deve retornar 200 ao requisitar todos os times', async () => {
    const httpResponse: Response = await chai.request(app).get('/teams');
    expect(httpResponse.status).to.be.equal(200);
    });

    it('Caso informado id inexistente como parametro, deve retornar not found 404', async () => {
        sinon.stub(Team, 'findOne').resolves(null);

        const httpResponse: Response = await chai.request(app).get('/teams/999');
        expect(httpResponse.status).to.be.equal(404);
        expect(httpResponse.body).to.be.deep.equal({ message: "Team not found" });

        sinon.restore();
    });

    it('Caso id correto, deve retornar time correspondente', async () => {
        const team = { 
            id: 1,
            teamName: 'test',
        }
        sinon.stub(Team, 'findOne').resolves(team as Team);

        const httpResponse: Response = await chai.request(app).get('/teams/1');
        expect(httpResponse.status).to.be.equal(200);
        expect(httpResponse.body).to.be.deep.equal({ id:1, teamName: 'test' });

        sinon.restore();
    });
});