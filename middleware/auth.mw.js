//create a MW will chcek if the request body is proper or not
const user_model = require('../models/user.model')
const verifySignUpBody = async (req,res,next)=>{

      try{
         //check for name
         if(!req.body.name){
            return res.status(400).send({message : 'Name is Not Provided in request body'})
         }
         //chcek for userid
            if(!req.body.userid){
                return res.status(400).send({message : 'Userid is Not Provided in request body'})
            }
            //check for password
            if(!req.body.password){
                return res.status(400).send({message : 'Password is Not Provided in request body'})
            }
            //check for email
            if(!req.body.email){
                return res.status(400).send({message : 'Email is Not Provided in request body'})
            }
            //check for user with same userid
            const user = await user_model.findOne({userid : req.body.userid})
            if(user){
                return res.status(400).send({message : 'Userid Already Exists'})
            }

                    next();

      }catch(err){
            console.log('Error in Verifying Signup Body:', err); // Log the specific error message
            res.status(500).send({message : 'Server Error'})
      }
}

module.exports = {
    verifySignUpBody : verifySignUpBody
};
