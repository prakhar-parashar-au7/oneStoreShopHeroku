import Shopkeeper from '../Models/Shopkeeper.js'

import Shop from '../Models/Shop.js'

import Products from '../Models/Products.js'


const controllers = {

    //About Shopkeeper

    signUpPage : (req, res) => {
        res.render('shopkeeperSignUp')
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
                 message : "Shopkeeper registered"
             })
         }
         )

    
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



    //All about Shops

    addShop : (req, res) => { 
        if (req.body.Category == 0) {
            req.body.Category = "Electronics"
        }

        else if (req.body.Category == 1) {
            req.body.Category = "Furnitures"
        }

        else if (req.body.Category == 2) {
            req.body.Category = "Automobiles"
        }
        else if (req.body.Category == 3) {
            req.body.Category = "Health&Welness"
        }
        else if (req.body.Category == 4) {
            req.body.Category = "GeneralStore"
        }

        else {
            res.send("Choose one of the category correctly")
        }
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
                console.log(shop)
                res.json({
                status : 200,
                message : "Shop listed successfully",
                shop : shop
                })
            })

        })

    },

    updateShop : async (req, res) => {
        shopId = req.params.id 

        if(req.body.Name){
          await Shop.findByIdAndUpdate(shopId, {Name : req.body.Name})
        }

        if(req.body.Category){
           await Shop.findByIdAndUpdate(shopId, {Category : req.body.Category})
        }

        if(req.body.locationFromVerticalRoadInKM){
           await Shop.findByIdAndUpdate(shopId, {locationFromVerticalRoadInKM : req.body.locationFromVerticalRoadInKM})
        }

        if(req.body.locationFromHorizontalRoadInKM){
           await Shop.findByIdAndUpdate(shopId, {locationFromHorizontalRoadInKM : req.body.locationFromHorizontalRoadInKM})
        }

        res.json({
            message : 'shop has been updated'
        })

    },

    removeShop : (req, res) => {
        shopId = req.params.id

        Shop.findByIdAndRemove(shopId, (shop) => {
            res.json({message : 'shop listed below is removed',
                     shop : shop
                         })
        })
    },
    

  // All about Products


    addProducts : async (req, res) => {

        Products.create(req.body)
        .then((productCreated) => {

            Products.findOne({Name : productCreated.Name})
            .populate('shop')
            .exec( (err, productPopulated)=> {
                if (err) {
                    res.json({
                        status : 500,
                        message : "Server Error, cannot add this shop to the product",
                        error : err
                    })
                }
                    console.log(productPopulated.shop.Category)
                    Products.findByIdAndUpdate(productCreated._id, {Category : productPopulated.shop.Category}, (err,prod) => {
                        if(err) {}
                        console.log(prod)
                    })
                    res.json({
                        status : 200,
                        message : "Product listed successfully",
                        product : productPopulated
                    })

                })
               
            })
        },


    

    updateProduct : async (req, res) => {
        productId = req.params.id 

    if(req.body.Name){
        await Products.findByIdAndUpdate(productId, {Name : req.body.Name})
      }

      if(req.body.priceInInr){
         await Products.findByIdAndUpdate(productId, {priceInInr : req.body.priceInInr})
      }

      if(req.body. features){
         await Products.findByIdAndUpdate(productId, { features : req.body. features})
      }

      if(req.body.piecesAvailable){
         await Products.findByIdAndUpdate(productId, {piecesAvailable : req.body.piecesAvailable})
      }

      res.json({
          status : 200,
          message : "Product has been updated"
      })

},

  
removeShop : (req, res) => {
    productId = req.params.id

    Products.findByIdAndRemove(productId, (product) => {
        res.json({message : 'Product listed below is removed',
                 shop : shop
                     })
    })
}




} 




export default controllers








