import jwt from 'jsonwebtoken';
import db from '../config/db';
import CONFIG from '../config/config';

const Auth = {
    async verifyToken(req, res, next){
        const token = req.headers['x-access-token'];
        if(!token){
            return res.status(400).send({
                "status": 400,
                "error": "Token is not provided"
            });
        }
        try{ 
            const decode = await jwt.verify(token, CONFIG.secret);
            const text = 'SELECT * FROM users WHERE id=$1';
            const { rows } = await db.query(text, [decode.userId]);
            if(!rows[0]){
                return res.status(400).send({
                    "status": 400,
                    "error":"Token is invalid"
                });
            }
            req.user = {id: decoded.userId};
            next();
        }catch(error){
            return res.status(400).send({
                "status": 400,
                "error": "server error"
            })
        }
    }
}

export default Auth;