import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import CONFIG from '../config/config';

const Helper = {

    hashPassword (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    },

    comparePassword (hashPassword, password) {
        return bcrypt.compare(password, hashPassword);
    },

    generateToken (id) {
        const token = jwt.sign({ userId: id}, CONFIG.secretkey , { expiresIn: '7d' });
        return token;
    }
}

export default Helper;