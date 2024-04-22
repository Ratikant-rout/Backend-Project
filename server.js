//This WIll Be STrating File Of the Project
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const server_config = require('./configs/server.config');
const db_config = require('./configs/db.config');
const user_model = require('./models/user.model');
const bcrypt = require('bcryptjs');

app.use(express.json()); //middle layer to parse the json data
//EXpress is a Type Of Function
//create an admin user at the strating of the application
//if no present


mongoose.connect(db_config.DB_URL)

const db = mongoose.connection;

db.on('error', (err)=>{
    console.log('Error in Connecting to Database', err);
})

db.once('open', ()=>{
    console.log('Connected to Database');
    init();
})

async function init() {
    try{
    let user = await user_model.findOne({ userid: 'admin' });

    if (user) {
        console.log('Admin User Already Exists');
        return;
    }
       }catch(err){
        console.log('Error in Finding Admin User:', err);
    }

    try {
        user = await user_model.create({
            name: 'Admin',
            userid: 'admin',
            password: bcrypt.hashSync('admin', 8),
            email: 'ratikantrout171@gmail.com',
            usertype: 'ADMIN'
        });
        console.log('Admin User Created');
    } catch (err) {
        console.log('Error in Creating Admin User:', err); // Log the specific error message
    }
}

//stich the route to the serverjs

require('./routes/auth.route')(app); //calling route and passing the app as object


    
app.listen(server_config.PORT, ()=>{
    console.log('Server is Running at ' , server_config.PORT);
})




