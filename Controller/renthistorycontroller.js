const RentHistory = require('../Modal/renthistoryschema');
const rentproperty = require('../Modal/rentschema');



exports.purchaserentProperty = async (req, res) => {
    console.log('hiiiiiiiiiiiiiiiii');
    const userId = req.payload;
    console.log(userId);

    try {
        const { Price, place, address, propertyimage, userId, propertyid, cardNumber, expiryDate, cardholderName, cvv, pin } = req.body;

        console.log(`${Price}, ${place}, ${address},${propertyimage},${userId}${propertyid},${cardNumber}, ${expiryDate}, ${cardholderName}, ${cvv}, ${pin}`);

        console.log('Property Details:', {
            Price, place, address, propertyimage, userId, propertyid, cardNumber, expiryDate, cardholderName, cvv, pin
        });

        const historyDocument = new RentHistory({
            Price, place, address, propertyimage, userId, propertyid, cardNumber, expiryDate, cardholderName, cvv, pin
        });

        const savedHistory = await historyDocument.save();

        const deletedProperty = await rentproperty.findOneAndDelete({
            _id: propertyid
        });

        // Delete property details from sessionStorage

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



//get rent history
exports.Getrenthistory = async(req,res)=>{
    const userId = req.payload
    try {
        const userrenthistory = await RentHistory.find({userId})
        res.status(200).json(userrenthistory)

        
    } catch (err) {
        res.status(401).json(`request failed due to ${err}`)

    }
}


//delete rent history
exports.deleterenthistory = async(req,res)=>{

    const{id} = req.params
    try {

        const removehistory= await RentHistory.findByIdAndDelete
        ({_id:id})
        res.status(200).json(removehistory)

        
    } catch (err) {
        res.status(401).json(err)  
    }
}
