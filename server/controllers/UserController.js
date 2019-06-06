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
    }

}

export default UserController;