//impoert mongoose 
const mongoose =  require('mongoose')

const newuserrentscheme = new mongoose.Schema({
    ID:{
        type:String,
        require:true,
        unique:true
    },
    Price:{
        type:String,
        require:true,
        
    },
    place:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true
    },
    furnishing:{
        type:String,
        require:true
    },
    bedroom:{
        type:String,
        require:true
    },
    bathroom:{
        type:String,
        require:true
    },
    floors:{
        type:String,
        require:true
    },
    carparking:{
        type:String,
        require:true
    },
    overview:{
        type:String,
        require:true
    },
    propertyimage:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    },
    propertyid:{
        type:String,
        require:true
    }
})

const newuserrentproperty = mongoose.model("newuserrentproperties",newuserrentscheme)

module.exports = newuserrentproperty