//import mongoose
const mongoose = require('mongoose')

//create scheme
const adminscheme = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:[3,'must be atleast 3 character but got {VALUE}']
    },
    email:{
        type:String,
        require:true,
        unique:true,
        valdator(value){
            if(!validator.isEmail(value))
            {throw new Error('invalid Email')}
        }
    },
    password:{
        type:String
       
    }

})


//create modal
const admins = mongoose.model("admins",adminscheme)

//export
module.exports = admins