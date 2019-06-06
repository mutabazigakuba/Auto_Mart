import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Helper = {

    hashPassword (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    },

    comparePassword (hashPassword, password) {
        return bcrypt.compareSync(password, hashPassword);
    },

    generateToken (id) {
        const token = jwt.sign({ userId: id}, "12346", { expiresIn: '7d' });
        return token;
    }
}

export default Helper;