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

    login( email, password){
        const findUser = this.users.find( user => user.email === email.body.email);
        if(!findUser){
            return {
                status: false,
                message: "Unregistered User"
            }
        }
        const comparePassword = helper.comparePassword(findUser.password, password)
        if(!comparePassword){
            return{
                status:false,
                message:"Wrong Password Please"
            }
        }

        const token = helper.generateToken(findUser.token)
        return{
            status:true,
            data: {
                "token": token,
                "id": findUser.id,
                "first_name": findUser.first_name,
                "last_name": findUser.last_name,
                "email": findUser.email
            }
        }
    }
}

export default new UserModel;