const newuserproperty = require('../Modal/newuserpropertyschema');
const property = require('../Modal/propertyschema');




exports.addnewuserproperty = async (req, res) => {
    console.log('inside property controller');
    
    const userId = req.payload;
    
    const propertyimage = req.file.filename;
    

    const { ID,Price, place, address, type, furnishing, bedroom, bathroom, floors, carparking, overview } = req.body;
    console.log(`${ID},${Price},${place},${address},${type},${furnishing},${bedroom},${bathroom},${floors},${carparking},${overview},${userId}`);

    try {
        const existproperty = await newuserproperty.findOne({ ID });
        if (existproperty) {
            res.status(406).json('Property already exists. Please upload a new property.');
        } else {
            const newproperty = new newuserproperty({
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

//get all requests
exports.getallrequests = async(req,res)=>{
    
    try {
        const allnewuserproperty = await newuserproperty.find()
        res.status(200).json(allnewuserproperty)
    } catch (err) {
        res.status(401).json(`request failed due to ${err}`)
    }
}


//Approval request
exports.addtosell = async (req, res) => {
    console.log('hiii newuserpropertycontroller');
    const userId = req.payload;
    console.log(userId);

    try {
        const { ID,Price, place, address,type,furnishing,bedroom, bathroom,floors,carparking,overview, propertyimage,userId, propertyid } = req.body;

        console.log(`${ID},${Price}, ${place}, ${address},${type},${furnishing},${bedroom},${bathroom},${floors},${carparking},${overview},${propertyimage},${userId},${propertyid}`);

        console.log(' new Property Details:', {ID,Price, place, address,type,furnishing,bedroom, bathroom,floors,carparking,overview, propertyimage,userId, propertyid
            
        });

        const historyDocument = new property({
            ID,Price, place, address,type,furnishing,bedroom, bathroom,floors,carparking,overview, propertyimage,userId, propertyid
        });

        const savedHistory = await historyDocument.save();

        const deletedProperty = await newuserproperty.findOneAndDelete({
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
exports.rejectrequest = async(req,res)=>{
    const{id} = req.params
    try {

        const removerequest= await newuserproperty.findByIdAndDelete
        ({_id:id})
        res.status(200).json(removerequest)

        
    } catch (err) {
        res.status(401).json(err)  
    }
}
