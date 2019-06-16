import mocha from 'mocha';
import chai from 'chai';
import chai_http from 'chai-http';
import app from '../index'

chai.use(chai_http);

const expect = chai.expect;

describe('Auto_Mart', () => {
    describe('POST REQUEST', () => {
        it('Return on SignUp to be JSON', (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .end((req, res) => {
                    expect(res).to.be.json;
                })
            done()
        })

        it('Return on SignIn to be JSON', (done) => {
            chai.request(app)
                .post('/api/v1/auth/signin')
                .end((req, res) => {
                    expect(res).to.be.json;
                })
            done()
        })

        it('Return on PostCar to be JSON', (done) => {
            chai.request(app)
                .post('/api/v1/car')
                .end((req, res) => {
                    expect(res).to.be.json;
                })
            done()
        })

        it('Return on MakeOrder to be JSON', (done) => {
            chai.request(app)
                .post('/api/v1/order')
                .end((req, res) => {
                    expect(res).to.be.json;
                })
            done()
        })
    })

    describe('PATCH REQUEST', () => {
        it('Return on UpdatePriceByBuyer to be JSON', (done) => {
            chai.request(app)
                .patch('/api/v1/order/:id/price')
                .end((req, res) => {
                    expect(res).to.be.json;
                })
            done()
        })

        it('Return on MarkSold to be JSON', (done) => {
            chai.request(app)
                .patch('/api/v1/car/:id/status')
                .end((req, res) => {
                    expect(res).to.be.json;
                })
            done()
        })

        it('Return on UpdatePriceBySeller to be JSON', (done) => {
            chai.request(app)
                .patch('/api/v1/car/:id/price')
                .end((req, res) => {
                    expect(res).to.be.json;
                })
            done()
        })

    })

    describe('GET REQUESTS', () => {
        it('Return on GetCar to be JSON', (done) => {
            chai.request(app)
                .get('/api/v1/car/:id')
                .end((req, res) => {
                    expect(res).to.be.json;
                })
            done()
        })

        it('Return on AllCars to be JSON', (done) => {
            chai.request(app)
                .get('/api/v1/cars/')
                .end((req, res) => {
                    expect(res).to.be.json;
                })
            done()
        })

        it('Return on AllAvailableInPriceRange to be JSON', (done) => {
            chai.request(app)
                .get('/api/v1/car')
                .end((req, res) => {
                    expect(res).to.be.json;
                })
            done()
        })
    })


})