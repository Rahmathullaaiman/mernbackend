//import mongoose
const mongoose = require('mongoose')

//access connection string of mongodb
const connectionstring = process.env.database

//connect server with mongodb
mongoose.connect(connectionstring).then(()=>{
    console.log('DATABASE CONNECTED');
}).catch((err)=>{
    console.log(`mongo db connection failed due to :${err}`);
})