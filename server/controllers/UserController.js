import UserModel from '../models/UserModel';
import Joi from 'joi';
import db from '../config/db';
import Helper from '../helpers/Helper'
import '@babel/polyfill'

const UserController = {
    async create(req, res) {
        const schema = {
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            confirm_password: Joi.string().min(6).required(),
            address: Joi.string().required()
        };
        const result = Joi.validate(req.body, schema);
        if (result.error) {
            return res.status(400).send({
                "status": 400,
                "error": result.error.details[0].message
            });
        }
        if (!Helper.isValidEmail(req.body.email)) {
            return res.status(400).send({
                "status": 400,
                "error": 'Please enter a valid email address'
            });
        }
        const user = UserModel.addNewUser(req);
        if (user.status === false) {
            return res.status(409).send({
                "status": 409,
                "error": user.data,
            })
        }
        if (user.status === false) {
            return res.status(401).send({
                "status": 401,
                "error": user.data,
            })
        }
        const createQuery = `INSERT INTO
            users(first_name, last_name, email, password, address)
            VALUES($1, $2, $3, $4, $5)
            returning *`;
        const values = [
            req.body.first_name,
            req.body.last_name,
            req.body.email,
            req.body.password,
            req.body.address
        ];
        const queryText = 'SELECT * FROM users WHERE email=$1';
        const mailData = await db.query(queryText, [req.body.email]);
        if (!(mailData.rows.length === 0)) {
            return res.status(400).json({
                status: 400,
                message: 'Email already taken!'
            })
        }
        try {
            const { rows } = await db.query(createQuery, values);
            const token = Helper.generateToken(rows[0]);
            return res.status(201).send({
                "status": 201,
                "data": rows
            });
        } catch (error) {
            return res.status(400).send({
                "status": 400,
                "error": error
            });
        }
    },

    async login(req, res) {
        const schema = {
            email: Joi.string().required(),
            password: Joi.string().min(6).required()
        };
        const result = Joi.validate(req.body, schema);
        if (result.error) {
            return res.status(400).send({
                "status": 400,
                "error": result.error.details[0].message
            });
        }
        if (!Helper.isValidEmail(req.body.email)) {
            return res.status(400).send({
                "status": 400,
                "error": 'Please enter a valid email address'
            });
        }
        const text = 'SELECT * FROM users WHERE email = $1';
        try {
            const { rows } = await db.query(text, [req.body.email]);
            if (!rows[0]) {
                return res.status(400).send({ 
                    "status": 400,
                    "error": "The credentials you provided are incorrect"
                 });
            }
            if (!(rows[0].password === req.body.password)) {
                return res.status(400).send({ 
                    "status": 400,
                    "error": "The credentials you provided do not match"
                 });
            }
            const token = Helper.generateToken(rows[0].id);
            return res.status(200).send({ 
                "status": 200,
                "data": [{
                    token,
                    rows
                }]
             });
        } catch (error) {
            console.log(error)
            return res.status(400).send({
                "status": 400,
                "error": "server error"
            })
        }
    }

}

export default UserController;