import UserModel from '../models/UserModel';
import Joi from 'joi';
import Users from '../migrations/userMigrations/createUser';
import db from '../config/db';
import Helper from '../helpers/Helper'

const UserController = {
    async create(req, res) {
        const schema = {
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            confirm_password: Joi.string().min(6).required()
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
            users(first_name, last_name, email, password)
            VALUES($1, $2, $3, $4)
            returning *`;
        const values = [
            req.body.first_name,
            req.body.last_name,
            req.body.email,
            req.body.password,
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
            return res.status(201).send(token);
        } catch (error) {
            return res.status(400).send({
                "status": 400,
                "error": error
            });
        }
    },

    login(req, res) {
        const login_user = UserModel.login(req, req);
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

        if (login_user.status == false) {
            return res.status(401).send({
                "status": 401,
                "error": login_user.message,
            })
        }

        return res.status(202).send({
            "status": 202,
            "data": login_user.data
        })


    }

}

export default UserController;