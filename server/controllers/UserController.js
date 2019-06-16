import UserModel from '../models/UserModel';
import Joi from 'joi';

const UserController = {
    create(req, res) {
        const schema = {
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            email: Joi.string().required(),
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
        return res.status(201).send({
            "status": 201,
            "data": user
        })
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