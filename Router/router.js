//setup path to resolve request 

//import express module
const express = require('express')

//import controller
const usercontroller = require('../Controller/usercontroller')

//import admin controller
const admincontroller = require('../Controller/admincontroller')

//propertycontroller
const propertycontroller = require('../Controller/propertycontroller')

//rentcontroller
const rentcontroller = require('../Controller/rentcontroller')
//history controller

const historycontroller = require('../Controller/historycontroller'); 

const renthistorycontroller = require('../Controller/renthistorycontroller')

const newuserpropertycontroller = require('../Controller/newuserpropertycontroller')

const newrentpropertycontroller = require('../Controller/newrentpropertycontroller')




//import jwtmiddleware
const jwtmiddleware = require('../Middleware/jwtmiddleware')

//import multer
const multerconfig = require('../Middleware/multermiddleware')

//create an object for router class inside express module
const router = new express.Router()

//setup path to resolve request
//syntax

//a)register
router.post('/user/register', usercontroller.register)

router.post('/admin/register', admincontroller.adminregister)

//b)login
router.post('/user/login',usercontroller.login)

//admin login
router.post('/admin/login',admincontroller.adminlogin)

//c)add property
router.post('/property/add',jwtmiddleware,multerconfig.single('propertyimage'),propertycontroller.addproperty)
//d)home property
router.get('/property/home',propertycontroller.Allhomeproperty)


router.get('/propertyses/adminhome',propertycontroller.getallprop)


//e)userpropertydetails
router.get('/property/user',jwtmiddleware,propertycontroller.Getuserproperty)
//f)add rent propert
router.post('/rentproperty/add',jwtmiddleware,multerconfig.single('propertyimage'),rentcontroller.addrentproperty)
//g)get rent property
router.get('/rentproperty/home',rentcontroller.Getrentproperty)
//h)rent user property dash
router.get('/rentproperty/user',jwtmiddleware,rentcontroller.Getrentuserproperty)
//i)update user property
router.put('/editproperty/user/:id',jwtmiddleware,multerconfig.single('propertyimage'),propertycontroller.edituserproperty)
//j)update rent properties
router.put('/editrentproperty/user/:id',jwtmiddleware,multerconfig.single('propertyimage'),rentcontroller.updaterentproperty)
//k)delete property
router.delete('/deleteproperty/user/:id',jwtmiddleware,propertycontroller.deleteproperty)
//l)delete rent property
router.delete('/deleterentproperty/user/:id',jwtmiddleware,rentcontroller.deleterentproperty)
//m)to add to historys
router.post('/property/purchase', jwtmiddleware, historycontroller.purchaseProperty);
//p)get from history
router.get('/history/user',jwtmiddleware,historycontroller.Gettohistory)
//q)delete history
router.delete('/deletehistory/user/:id',jwtmiddleware,historycontroller.deletehistory)

//r)add to rent history
router.post('/rentproperty/purchase', jwtmiddleware, renthistorycontroller.purchaserentProperty);

//s)get from rent history
router.get('/renthistory/user',jwtmiddleware,renthistorycontroller.Getrenthistory)

//t)delete from rent history
router.delete('/deleterenthistory/user/:id',jwtmiddleware,renthistorycontroller.deleterenthistory)

//u)get user details
router.get('/user/details',usercontroller.Allusers)
//v)add new userproperty


router.post('/newuserproperty/new',jwtmiddleware,multerconfig.single('propertyimage'),newuserpropertycontroller.addnewuserproperty)

//get all requests
router.get('/allrequest/user',newuserpropertycontroller.getallrequests)

//approve to sellproperties
router.post('/addtosell/add',newuserpropertycontroller.addtosell)

router.post('/addtorents/renting',newrentpropertycontroller.addtorent)


//delete user
router.delete('/delete/user/:id',jwtmiddleware,usercontroller.deleteuser)
//reject request
router.delete('/reject/request/:id',jwtmiddleware,newuserpropertycontroller.rejectrequest)

//addnew user rent property
router.post('/newrentproperty/newrent',jwtmiddleware,multerconfig.single('propertyimage'),newrentpropertycontroller.addrentuserproperty)


//get all rent request
router.get('/allrentrequest/rentuser',newrentpropertycontroller.getrentrequests)

//reject rent request
router.delete('/rentreject/rentrequest/:id',jwtmiddleware,newrentpropertycontroller.rejectrentrequest)





















//export router
module.exports = router