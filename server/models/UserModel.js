import helper from '../helpers/Helper';

class UserModel {

    constructor(){
        this.users = [];
    }

    addNewUser (data){
        const id = this.users.length + 1;
        // const hPassword = helper.hashPassword(data.body.password);
        const token = helper.generateToken(id);

        const checkEmail = data.body.email;
        const findUser = this.users.find( user => user.email === checkEmail);
        if(findUser){
            return{
                status:false,
                data: "The email " +checkEmail+ " already used"
            }
        }
        const confirmPass = data.body.confirm_password
        const pass = data.body.password;
        if(confirmPass !== pass){
            return {
                status: false,
                data: "Passwords Do not Match"
            }
        }
        const newUser = {
            id: id,
            first_name: data.body.first_name,
            last_name: data.body.last_name,
            email: data.body.email,
            status: data.body.status,
            password: data.body.password,
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
        const newPassword = password.body.password
        if(!(newPassword === findUser.password)){
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