//impoert modal
const users = require('../Modal/userschema')




//import JWT
const jwt = require('jsonwebtoken')




//register request
exports.register =async (req,res)=>{
    console.log('inside project controller');
    //extract data from request body
    const{username,email,password}=req.body
  try{  const existuser = await users.findOne({email})

    if(existuser){
      
        res.status(406).json('Account already exist... please login')
    }
    else{
        //register
        const newuser = new users({
            username,
            email,
            password,
            github:"",
            linkedin:"",
            profile:""
            
        })
        //add to mongodb
        await newuser.save()

        res.status(200).json(newuser)

    }
}catch(err){
    res.status(401).json(`Register request failed due to ${err}`)

}


}




//login
exports.login =async (req,res)=>{
    const{email,password} = req.body

   try{ 
      const existuser =await users.findOne({email,password})
    console.log(existuser);

    if(existuser){
          //jwt token
        //payload-information is secretely transmitted
        //secret or private
        const token = jwt.sign({userId:existuser._id},"supersecretkey")

        res.status(200).json({
            existuser,
            token
        })
    }
    else{
        res.status(404).json('invalid emailID or password')
    }
}catch(err){
    res.status(401).json(`login request failed due to ${err}`);
}
}


// getallusers details
exports.Allusers = async (req, res) => {
    try {
        const allusers = await users.find();
        res.status(200).json(allusers);
    } catch (err) {
        res.status(401).json(`request failed due to ${err}`);
    }
};


//delete user
exports.deleteuser=async(req,res)=>{
    const{id} = req.params
    try {

        const removeuser= await users.findByIdAndDelete
        ({_id:id})
        res.status(200).json(removeuser)

        
    } catch (err) {
        res.status(401).json(err)  
    }
}