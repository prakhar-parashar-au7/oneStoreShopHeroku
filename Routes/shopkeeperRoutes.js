import express from 'express'
import controllers from '../Controllers/shopkeeperController.js'
import expressValidator from 'express-validator'

const Router = express.Router()

const {check, validationResult} = expressValidator


Router.get('shopkeepersignUp', controllers.signUpPage) 

Router.post('/shopkeeperSignUpPost', controllers.signUpPost)

Router.get('/shopkeeperLogInPage', controllers.logInPage)

Router.post('/shopkeeperLogInPost', controllers.logInPost)

Router.post('/shopkeeper/addShop', controllers.addShop)

Router.post('/shopkeeper/shop/addProducts', controllers.addProducts)

export default Router