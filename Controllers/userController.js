
import User from '../Models/User.js'

import Shops from '../Models/Shop.js'

import jwt from 'jsonwebtoken'




const controllers = {

    signUpPage : (req, res) => {
        res.render('signUp', {data : "heyy"})
       
    },

    signUpPost : (req, res) => {
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

    
    },

    logInPage : (req, res) => {
        res.render('logIn')
    },

    logInPost : (req, res, next) => {
        //  User.findOne({userName : req.body.userName}, (err, user) => {
        //     if (user.password == req.body.password) {

                var token = jwt.sign({userName :  req.body.userName}, 'secret', (err, token) => {
                    req.body.token = token
                    next()

                })

           },
        // })
       


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
                          const xShop = shops[i].locationFromVerticalRoad;
                          
                          const yShop = shops[i].locationFromHorizontalRoad;
                          
                          const xUser = currentUser[0].locationFromVerticalRoad;
                          
                          const yUser= currentUser[0].locationFromHorizontalRoad;
                          

                          const distance = Math.sqrt(Math.pow(xShop-xUser,2) + Math.pow(yShop-yUser,2))


                          shops[i].locationFromUser = distance
                         
                     }
                     
                    
                    
                     shops.sort(function(a,b){
                        return a.locationFromUser - b.locationFromUser
                     })  

                     res.send(shops)


                          



                   //  }
                 })
             })
         })
     }
    }



export default controllers








