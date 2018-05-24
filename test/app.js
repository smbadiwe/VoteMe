import chaiHttp  from 'chai-http';
import chai from "chai";
import app from '../src/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe("App.js tests", () => {
    it("Hello world works", async () => {
        console.log('running App.js tests 2');
        const response = await chai.request(app.callback()).get('/');
        expect(response.status).to.equal(200);
        expect(response.text).to.equal("Hello world!");
    }); 
});
