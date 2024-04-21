//1)import dotenv
//Loads .env file contents into process.env by default.
require('dotenv').config() 


//2)import expreess
const express = require('express')

//3)import cors
const cors = require('cors')

//impoert  router
const router = require('./Router/router')


//import connection.js file
require('./DB/connection')

//4)create server
//create an express application.the express() function is a top-level function exported by the express module
const mernserver = express()

//5)use of cors in server
mernserver.use(cors())

//6)returns middleware that only parses json -javascript object
mernserver.use(express.json())


//use of router by server
mernserver.use(router)


////server use uploads folder
mernserver.use('/uploads',express.static('./uploads'))

//7 customize the port  - by default 3000
const PORT = 10000 || process.env

//8)to run server
mernserver.listen(PORT,()=>{
    console.log(`SERVER RUNNING SUCCESSFULLY AT PORT NUMBER ${PORT}`);
})

mernserver.get('/',(req,res)=>{
    res.send(`<h1>mern server is running successfully and ready to accept requests from client</h1> `)
})

// //post request
// mernserver.post('/',(req,res)=>{
//     res.send(`post request`)
// })

// //put request
// mernserver.put('/',(req,res)=>{
//     res.send(`put request`)
// })

