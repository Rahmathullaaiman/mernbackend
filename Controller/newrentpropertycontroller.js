const newuserrentproperty = require('../Modal/newrentschema');
const rentproperty = require('../Modal/rentschema');



exports.addrentuserproperty = async (req, res) => {
    console.log('inside property controller');
    
    const userId = req.payload;
    
    const propertyimage = req.file.filename;
    

    const { ID,Price, place, address, type, furnishing, bedroom, bathroom, floors, carparking, overview } = req.body;
    console.log(`${ID},${Price},${place},${address},${type},${furnishing},${bedroom},${bathroom},${floors},${carparking},${overview},${userId}`);

    try {
        const existproperty = await newuserrentproperty.findOne({ ID });
        if (existproperty) {
            res.status(406).json('Property already exists. Please upload a new property.');
        } else {
            const newproperty = new newuserrentproperty({
                ID,Price, place, address, type, furnishing, bedroom, bathroom, floors, carparking, overview, userId,
                propertyimage

            });
            await newproperty.save();
            res.status(200).json(newproperty); 
        }
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`);
    }
};


//get rent request
exports.getrentrequests = async(req,res)=>{
    
    try {
        const allrentuserproperty = await newuserrentproperty.find()
        res.status(200).json(allrentuserproperty)
    } catch (err) {
        res.status(401).json(`request failed due to ${err}`)
    }
}

//rent approval
exports.addtorent = async (req, res) => {
    console.log('hiii newrentpropertycontroller');
    const userId = req.payload;
    console.log(userId);

    try {
        const { ID,Price, place, address,type,furnishing,bedroom, bathroom,floors,carparking,overview, propertyimage,userId, propertyid } = req.body;

        console.log(`${ID},${Price}, ${place}, ${address},${type},${furnishing},${bedroom},${bathroom},${floors},${carparking},${overview},${propertyimage},${userId},${propertyid}`);

        console.log(' new rentProperty Details:', {ID,Price, place, address,type,furnishing,bedroom, bathroom,floors,carparking,overview, propertyimage,userId, propertyid
            
        });

        const historyDocument = new rentproperty({
            ID,Price, place, address,type,furnishing,bedroom, bathroom,floors,carparking,overview, propertyimage,userId, propertyid
        });

        const savedHistory = await historyDocument.save();

        const deletedProperty = await newuserrentproperty.findOneAndDelete({
            _id: propertyid
        });

        res.status(200).json({
            message: 'Property purchased successfully!',
            history: savedHistory,
            deletedProperty: deletedProperty,
        });
    } catch (error) {
        console.error('Error purchasing property:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//reject request
exports.rejectrentrequest = async(req,res)=>{
    const{id} = req.params
    try {

        const removerequest= await newuserrentproperty.findByIdAndDelete
        ({_id:id})
        res.status(200).json(removerequest)

        
    } catch (err) {
        res.status(401).json(err)  
    }
}
