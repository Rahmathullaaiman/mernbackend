const property = require('../Modal/propertyschema');

exports.addproperty = async (req, res) => {
    console.log('inside property controller');
    
    const userId = req.payload;
    console.log(userId); 
    const propertyimage = req.file.filename;
    console.log(propertyimage);

    const { ID,Price, place, address, type, furnishing, bedroom, bathroom, floors, carparking, overview } = req.body;
    console.log(`${ID},${Price},${place},${address},${type},${furnishing},${bedroom},${bathroom},${floors},${carparking},${overview},${userId}`);

    try {
        const existproperty = await property.findOne({ ID });
        if (existproperty) {
            res.status(406).json('Property already exists. Please upload a new property.');
        } else {
            const newproperty = new property({
                ID,Price, place, address, type, furnishing, bedroom, bathroom, floors, carparking, overview, userId,
                propertyimage

            });
            await newproperty.save();
            res.status(200).json(newproperty); // Sending the newly added property as a response
        }
    } catch (err) {
        res.status(401).json(`Request failed due to ${err}`);
    }
};

//to display properties in home
exports.Allhomeproperty = async(req,res)=>{
    const search = req.query.search
    console.log(search);
    const query = {
        place:{
            $regex:search,$options:'i'
        }
    }
    try {
        const homeproperty = await property.find(query)
        res.status(200).json(homeproperty)
    } catch (err) {
        res.status(401).json(`request failed due to ${err}`)
    }
}

exports.getallprop = async(req,res)=>{
    try {
        const homepropertys = await property.find()
        res.status(200).json(homepropertys)
    } catch (err) {
        res.status(401).json(`request failed due to ${err}`)
    }
}

//to display user added properties
exports.Getuserproperty = async(req,res)=>{
    const userId = req.payload
    try {
        const userproperty = await property.find({userId})
        res.status(200).json(userproperty)

        
    } catch (err) {
        res.status(401).json(`request failed due to ${err}`)

    }
}

//to edit edit user property details
exports.edituserproperty = async(req,res)=>{
    const{id} = req.params
    const userId = req.payload
    const { ID,Price, place, address, type, furnishing, bedroom, bathroom, floors, carparking, overview,propertyimage } = req.body;
    const uploadedpropertyimage = req.file?req.file.filename:propertyimage

       try {

        const updateproperty = await property.findByIdAndUpdate
        ({_id:id},{ID,Price,place,address,type,furnishing,bedroom,bathroom,floors,carparking,overview,propertyimage:uploadedpropertyimage,userId},{new:true})

        await updateproperty.save()
        res.status(200).json(updateproperty)
        
       } catch (err) {
        res.status(401).json(err)
        
       }

}

//delete property
exports.deleteproperty = async(req,res)=>{
    const{id} = req.params
    try {

        const removeproperty= await property.findByIdAndDelete
        ({_id:id})
        res.status(200).json(removeproperty)

        
    } catch (err) {
        res.status(401).json(err)  
    }
}
