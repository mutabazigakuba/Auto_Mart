import mocha from 'mocha';
import chai from 'chai';
import chai_http from 'chai-http';
import app from '../index'

chai.use(chai_http);

const expect = chai.expect;

describe ('Auto_Mart', () =>{
    describe('POST REQUEST', () =>{
        it('Return on SignUp to be JSON', (done) =>{
            chai.request(app)
                .post('/api/v1/auth/signup')
                .end ((req, res) => {
                    expect(res).to.be.json;    
                })
                done()
        } )

        it('Return on SignIn to be JSON', (done) =>{
            chai.request(app)
                .post('/api/v1/auth/signin')
                .end ((req, res) => {
                    expect(res).to.be.json;    
                })
                done()
        } )

        it('Return on PostCar to be JSON', (done) =>{
            chai.request(app)
                .post('/api/v1/car')
                .end ((req, res) => {
                    expect(res).to.be.json;    
                })
                done()
        } )
    })
})