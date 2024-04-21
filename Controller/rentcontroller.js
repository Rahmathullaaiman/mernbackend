const rentproperty = require('../Modal/rentschema');

exports.addrentproperty = async (req, res) => {
    console.log('inside property controller');
    
    const userId = req.payload;
    console.log(userId); 
    const propertyimage = req.file.filename;
    console.log(propertyimage);

    const { ID,Price, place, address, type, furnishing, bedroom, bathroom, floors, carparking, overview } = req.body;
    console.log(`${ID},${Price},${place},${address},${type},${furnishing},${bedroom},${bathroom},${floors},${carparking},${overview},${userId}`);

    try {
        const existproperty = await rentproperty.findOne({ ID });
        if (existproperty) {
            res.status(406).json('Property already exists. Please upload a new property.');
        } else {
            const newproperty = new rentproperty({
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


//get all rent property
exports.Getrentproperty = async(req,res)=>{
    const search = req.query.search
    console.log(search);
    const query = {
        place:{
            $regex:search,$options:'i'
        }
    }
    
    try {
        const homeproperty = await rentproperty.find(query)
        res.status(200).json(homeproperty)
    } catch (err) {
        res.status(401).json(`request failed due to ${err}`)
    }
}


//get user rent property
exports.Getrentuserproperty = async(req,res)=>{
    const userId = req.payload
    try {
        const userproperty = await rentproperty.find({userId})
        res.status(200).json(userproperty)

        
    } catch (err) {
        res.status(401).json(`request failed due to ${err}`)

    }
}


//update rent property
exports.updaterentproperty = async(req,res)=>{
    const{id} = req.params
    const userId = req.payload
    const { ID,Price, place, address, type, furnishing, bedroom, bathroom, floors, carparking, overview,propertyimage } = req.body;
    const uploadedpropertyimage = req.file?req.file.filename:propertyimage

       try {

        const updateproperty = await rentproperty.findByIdAndUpdate
        ({_id:id},{ID,Price,place,address,type,furnishing,bedroom,bathroom,floors,carparking,overview,propertyimage:uploadedpropertyimage,userId},{new:true})

        await updateproperty.save()
        res.status(200).json(updateproperty)
        
       } catch (err) {
        res.status(401).json(err)
        
       }

}


//delete rent property
exports.deleterentproperty = async(req,res)=>{
    const{id} = req.params
    try {

        const removeproperty= await rentproperty.findByIdAndDelete
        ({_id:id})
        res.status(200).json(removeproperty)

        
    } catch (err) {
        res.status(401).json(err)  
    }
}


