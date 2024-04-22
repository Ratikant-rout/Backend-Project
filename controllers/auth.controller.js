const bcrypt = require('bcryptjs');
const user_model = require('../models/user.model');
const jwt = require('jsonwebtoken');
const secret = require('../configs/auth.config');

exports.signup = async (req, res) => {
    // Logic to create user

    // Read the request body

    // Insert the data into the user collection in MongoDB
    const request_body = req.body;

    const userobj = {
        name: request_body.name,
        userid: request_body.userid,
        password: bcrypt.hashSync(request_body.password, 8),
        email: request_body.email,
        userType: 'user'
    };

    try {
        const user_created = await user_model.create(userobj);

        // Return the response back to the user
        const res_obj = {
            name: user_created.name,
            userid: user_created.userid,
            email: user_created.email,
            userType: user_created.userType,
            createdAt: user_created.createdAt,
            updatedAt: user_created.updatedAt
        };
    } catch (err) {
        console.log('Error in Creating User:', err);
        res.status(500).send({ message: 'Server Error' });
    }
}

exports.signin = async (req, res) => {
      //chcek if user id is present in the system
       const user = await user_model.findOne({userid: req.body.userid})
           if(user == null){
            res.status(404).send({message: 'User Not Found'});
           }
      //password is correct
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid){
            res.status(401).send({message: 'Invalid Password'});
        }

      //generate the token and send it back to the user
        const token = jwt.sign({id: user.userid}, secret.secret, {
            expiresIn: 120
        });

        res.status(200).send({
            name: user.name,
            userid: user.userid,
            email: user.email,
            usertype: user.usertype,
            token: token
        })

}

        