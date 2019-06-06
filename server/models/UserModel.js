import helper from '../helpers/Helper';

class UserModel {

    constructor(){
        this.users = [];
    }

    addNewUser (data){
        const id = this.users.length + 1;
        const hPassword = helper.hashPassword(data.body.password);
        const token = helper.generateToken(id);

        const newUser = {
            id: id,
            first_name: data.body.first_name,
            last_name: data.body.last_name,
            email: data.body.email,
            status: data.body.status,
            password: hPassword,
            confirm_password: data.body.confirm_password,
            token: token
        };
        this.users.push(newUser);
        return newUser;
    }
}

export default new UserModel;