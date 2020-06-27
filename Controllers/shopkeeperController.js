import Shopkeeper from '../Models/Shopkeeper.js'

import Shop from '../Models/Shop.js'

import Products from '../Models/Products.js'


const controllers = {

    signUpPage : (req, res) => {
        res.render('signUp')
       
    },

    signUpPost : (req, res) => {
         Shopkeeper.create(req.body)
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

    logInPost : (req, res) => {
        Shopkeeper.findOne({userName : req.body.userName}, (err, user) => {
           if (user.password == req.body.password) {

            res.json({
                status : 200,
                message : "Login successful"
            })

           }
        })
       
    },

    addShop : (req, res) => {        
        const shop = new Shop(req.body)

        shop.save((err) => {
            if(err) {
                res.json({
                    status : 500,
                    message : "Server Error",
                    error : err
                })
            }
            
            Shop.findOne({Name: shop.Name})
            .populate('shopkeeper')
            .exec(function(err, shop ){
                if(err) res.json({
                    status : 500,
                    message: 'Server Error : cannot add shopkeeper to this shop',
                    error : err
                })
                res.json({
                status : 200,
                message : "Shop listed successfully",
                shop : shop
                })
            })

        })

    },
    
    addProducts : (req, res) => {

        Products.create(req.body)
        .then((product) => {

            Products.findOne({Name : product.Name})
            .populate('shop')
            .exec( (err, product)=> {
                if (err) {
                    res.json({
                        status : 500,
                        message : "Server Error, cannot add this shop to the product",
                        error : err
                    })
                }
                res.json({
                    status : 200,
                    message : "Product listed successfully",
                    product : product
                })
            })
        })


    },

    



}        


export default controllers








