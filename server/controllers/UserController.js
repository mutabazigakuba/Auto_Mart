import UserModel from '../models/UserModel';

const UserController = {

    create (req, res){
        if(!req.body.first_name || !req.body.last_name || !req.body.password){
            return res.status(400).send({
                "status": 400,
                "Error": "There is an empty field!"
            });
        }
        const user = UserModel.addNewUser(req);
        return res.status(200).send({
            "status":200,
            "data": user
        })
    },

    login(req, res){
        const login_user = UserModel.login(req, req);

        if(!req.body.email && !req.body.password){
            return res.status(400).send({
                "status": 400,
                "Error": "There is an empty field!"
            });
        }

        if (login_user.status == false) {
            return res.status(401).send({
                status: 401,
                Error: login_user.message,
            })
        }
      
        return res.status(200).send({
            status: 200,
            data: login_user.data
        })


    }

}

export default UserController;