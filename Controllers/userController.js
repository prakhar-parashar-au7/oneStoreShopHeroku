
import User from '../Models/User.js'

import Shops from '../Models/Shop.js'

import jwt from 'jsonwebtoken'

import Products from '../Models/Products.js'

import bcrypt from 'bcrypt'
import Shop from '../Models/Shop.js'



const controllers = {

    signUpPage : (req, res) => {
        res.render('userSignUp')
    },


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

                    // console.log(currentUser[0].locationFromVerticalRoadInKM)

                     for (let i=0; i<shops.length; i++){
                          const xShop = shops[i].locationFromVerticalRoadInKM;
                          
                          const yShop = shops[i].locationFromHorizontalRoadInKM;
                          
                          const xUser = currentUser[0].locationFromVerticalRoadInKM;
                          
                          const yUser= currentUser[0].locationFromHorizontalRoadInKM;

                       //   console.log(xShop, yShop, xUser, yUser)
                          

                          const distance = Math.sqrt(Math.pow(xShop-xUser,2) + Math.pow(yShop-yUser,2))

                        //  console.log(distance)
                          shops[i].locationFromUser = distance                 
                     }
                     //console.log(shops)
                     
                     shops.sort(function(a,b){
                        return a.locationFromUser - b.locationFromUser
                     })  

                     res.send(shops)


                          



                   
                 })
             })
         })
     },

     listProducts : (req,res) => {
        const shopId = req.params.id
         Products.find({shop : shopId}, (err, products) => {
             if(err) {
                 res.json({
                     status : 400,
                     message : "Cannot list products",
                     error : err
                 })
             }
             console.log(products[0].shop)
             res.json({
                 status : 200,
                 message : "Below are all the products in the shop you provided id for",
                 products : products
             })
         })


     },

     listShopsWithCategory : (req, res) => {
         if(req.params.Category == 0) {
             Shops.find({Category : "Electronics"}, (err, shops) => {
                 if(err) {}
                 res.json({
                     status : 200,
                     message : "listed below are shops in requested category",
                     shops : shops
                 })
             })

         }

        else if(req.params.Category == 1) {
            Shops.find({Category : "Furnitures"}, (err, shops) => {
                if(err) {}
                res.json({
                    status : 200,
                    message : "listed below are shops in requested category",
                    shops : shops
                })
            })

        }

       else if(req.params.Category == 2) {
            Shops.find({Category : "Automobiles"}, (err, shops) => {
                if(err) {}
                res.json({
                    status : 200,
                    message : "listed below are shops in requested category",
                    shops : shops
                })
            })

        }

       else if(req.params.Category == 3) {
            Shops.find({Category : "Health&Wellness"}, (err, shops) => {
                if(err) {}
                res.json({
                    status : 200,
                    message : "listed below are shops in requested category",
                    shops : shops
                })
            })

        }

       else if(req.params.Category == 4) {
            Shops.find({Category : "GeneralStore"}, (err, shops) => {
                if(err) {}
                res.json({
                    status : 200,
                    message : "listed below are shops in requested category",
                    shops : shops
                })
            })

        }

        else {
            res.json({
                status : 404,
                message : "Please choose one of the cateogories correctly"
            })
        }
    },


      listProductsWithCategory : (req, res) => {


          if(req.params.Category == 0) {
             Products.find({Category : "Electronics"}, (err, products) => {
                if(err) {}
               res.json({
                     status : 200,
                      message : "listed below are products in requested category",
                      products : products
                  })
              })

          }

         else if(req.params.Category == 1) {
            Products.find({Category : "Furnitures"}, (err, products) => {
                 if(err) {}
                 res.json({
                    status : 200,
                    message : "listed below are products in requested category",
                    products : products
             })
         })
         }

       else if(req.params.Category == 2) {
            Products.find({Category : "Automobiles"}, (err, products) => {
                if(err) {}
                res.json({
                    status : 200,
                    message : "listed below are products in requested category",
                    products : products
                })
            })
        }

       else if(req.params.Category == 3) {
            Products.find({Category : "Health&Wellness"}, (err, products) => {
                if(err) {}
                res.json({
                    status : 200,
                    message : "listed below are shops in requested category",
                    products : products
                })
            })

        }

       else if(req.params.Category == 4) {
            Products.find({Category : "GeneralStore"}, (err, products) => {
                if(err) {}
               res.json({
                    status : 200,
                    message : "listed below are shops in requested category",
                    products : products
                })
            })

        }

        else {
            res.json({
                status : 404,
                message : "Please choose one of the cateogories correctly"
            })
        }
    

     },

   // When user books a product 

     bookProduct : async (req, res) => {
        const token = req.body.token
         jwt.verify(token, 'secret', ( err, user) => {
             console.log(user)
         User.findOneAndUpdate({userName : user.userName}, {orderPending : true}, (err,updatedUser) => {
         const productId = req.params.id 
         Products.update({_id : productId}, {$inc: {currentBookings : 1, piecesAvailable : -1}}, (err, product)=> {
         setTimeout(()=> {
           User.findOne({userName : user.userName}, (err,user) => {
                    if (user.orderPending == true){
                        Products.findOne({_id : productId}, (err, product) => {
                            Shop.update({_id : product.shop}, {$inc:{failedDeliveries : 1}}, (err, shop)=> {
                            
                            })
                        })                  
                    }
                    else {
                        Products.findOne({_id : productId}, (err, product) => {
                            Shop.update({_id : product.shop}, {$inc:{successfulDeliveries : 1}}, (err, shop)=> {
                
                            })
                        })      
                    }
                    
                })
    
            }, 40000)

        res.json({
            status : 200,
            message : "Product is booked. Timer is started. Please notify us when the product is delivered"
        })    

         })

         })




        })
        
        
         
    },

    productDelivered : (req, res) => {

        const token = req.body.token
        jwt.verify(token, 'secret', ( err, user) => {
        User.findOneAndUpdate({userName : user.userName}, {orderPending : false}, (err, user) => {
            res.json({
                status : 200,
                message : "Thanks for notifying us that the product is delivered to you"
            })
        })
        
    })



    }


}



export default controllers








