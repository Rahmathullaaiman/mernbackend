const admins = require('../Modal/adminschema');


const jwt = require('jsonwebtoken')


exports.adminregister =async (req,res)=>{
    console.log('inside project controller');
    //extract data from request body
    const{username,email,password}=req.body
  try{  const adminuser = await admins.findOne({email})

    if(adminuser){
      
        res.status(406).json('Account already exist... please login')
    }
    else{
        //register
        const newadmin = new admins({
            username,
            email,
            password
            
        })
        //add to mongodb
        await newadmin.save()

        res.status(200).json(newadmin)

    }
}catch(err){
    res.status(401).json(`Register request failed due to ${err}`)

}


}


//login admin
exports.adminlogin =async (req,res)=>{
    const{email,password} = req.body

   try{ 
      const adminuser =await admins.findOne({email,password})
    console.log(adminuser);

    if(adminuser){
          //jwt token
        //payload-information is secretely transmitted
        //secret or private
        const token = jwt.sign({userId:adminuser._id},"supersecretkey")

        res.status(200).json({
            adminuser,
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
