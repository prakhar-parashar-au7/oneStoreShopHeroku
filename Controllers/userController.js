
import User from '../Models/User.js'

import Shops from '../Models/Shop.js'

import jwt from 'jsonwebtoken'

import Products from '../Models/Products.js'

import bcrypt from 'bcrypt'



const controllers = {


    signUpPost : (req, res) => {
        const saltRounds = 10
        bcrypt.hash(req.body.password, saltRounds, function(err, hashedPassword){
        req.body.password = hashedPassword
        User.create(req.body)
            .then((user, err) => {
                if (err) {
                    res.json({
                        status : 400,
                        message : "Mongodb Cannot create new user",
                        error : err
                    })
                }
                res.json({
                    status : 200,
                    message : "Registration Successful",
                    user : user
                })
            }
            )
   
        })
        
    
    },

    logInPost : (req, res, next) => {
          User.findOne({userName : req.body.userName}, (err, user) => {
              
             bcrypt.compare (req.body.password, user.password, (err, result) => {
                 if(err) {
                     res.send("error is "+ err)
                 }
                 else if (result == true){
                    var token = jwt.sign({userName :  req.body.userName}, 'secret', (err, token) => {
                        req.body.token = token
                        next()
    
                    })

                 }

             }) 

              

           
         })
        },
       


     listShops : (req, res) => {
         const token = req.body.token
         console.log(token)
         jwt.verify(token, 'secret', ( err, user) => {
             if(err) res.json({
                 status : 404,
                 message : "Session Expired",
                 error : err
             })
             Shops.find((err,shops) => {
                 if (err) {console.log(err)}
                 User.find({userName : user.userName}, (err,currentUser) => {

                     if(err) {console.log(err)}
                     
                    
                     for (let i=0; i<shops.length; i++){
                          const xShop = shops[i].locationFromVerticalRoadInKM;
                          
                          const yShop = shops[i].locationFromHorizontalRoadInKM;
                          
                          const xUser = currentUser[0].locationFromVerticalRoadInKM;
                          
                          const yUser= currentUser[0].locationFromHorizontalRoadInKM;
                          

                          const distance = Math.sqrt(Math.pow(xShop-xUser,2) + Math.pow(yShop-yUser,2))


                          shops[i].locationFromUser = distance                 
                     }
                     
                     shops.sort(function(a,b){
                        return a.locationFromUser - b.locationFromUser
                     })  

                     res.send(shops)


                          



                   
                 })
             })
         })
     },

     listProducts : (req,res) => {
         shopId = req.params.id
         Products.find({shopkeeper : shopId}, (err, products) => {
             if(err) {
                 res.json({
                     status : 400,
                     message : "Cannot list products",
                     error : err
                 })
             }
             res.json({
                 status : 200,
                 message : "Below are all the products in the shop you provided id for",
                 products : products
             })
         })


     }
    }



export default controllers








