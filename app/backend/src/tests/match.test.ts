import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes de /matches', async () => {
    it('Deve retornar status 200 ao acessar as partidas', async () => {
        const httpResponse: Response = await chai.request(app).get('/matches')
        expect(httpResponse.status).to.be.equal(200);
    });

    it('Deve retornar status 200 retornando todas as matches se especificar status incorreto', async () => {
        const httpResponse: Response = await chai.request(app).get('/matches?inProgress=test')
        expect(httpResponse.status).to.be.equal(200);
    });

    it('Deve retornar status 200 ao acessar as partidas especificando status false', async () => {
        const httpResponse: Response = await chai.request(app).get('/matches?inProgress=false')
        expect(httpResponse.status).to.be.equal(200);
    });

    it('Deve retornar status 200 ao acessar as partidas especificando status true', async () => {
        const httpResponse: Response = await chai.request(app).get('/matches?inProgress=true')
        expect(httpResponse.status).to.be.equal(200);
    });
});