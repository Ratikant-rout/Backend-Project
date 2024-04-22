exports.signup = async (req, res) => {
    // Logic to create user

    // Read the request body
    const bcrypt = require('bcryptjs');
    const user_model = require('../models/user.model');

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

        