const mongoose = require('mongoose');

const renthistoryScheme = new mongoose.Schema({
    
  
   
    Price: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
   
    propertyimage: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    propertyid: {
        type: String,
        required: true
    },
    cardNumber: {
        type: String,
        required: true
    },
    expiryDate: {
        type: String,
        required: true
    },
    cardholderName: {
        type: String,
        required: true
    },
    cvv: {
        type: String,
        required: true
    },
    pin: {
        type: String,
        required: true
    }
 
});

const RentHistory = mongoose.model("rentshistorys", renthistoryScheme);

module.exports = RentHistory;
