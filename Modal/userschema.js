//import mongoose
const mongoose = require('mongoose')

//create scheme
const usersheme = new mongoose.Schema({
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
       
    },
    github:{
        type:String
    },
    linkedin:{
        type:String
    },
    profile:{
        type:String
    }

})


//create modal
const users = mongoose.model("users",usersheme)

//export
module.exports = users