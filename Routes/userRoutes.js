import express from 'express'
import controllers from '../Controllers/userController.js'
import cookieParser from 'cookie-parser'
import cookieHandler from './cookies.js'

const Router = express()

Router.use(cookieParser())

Router.post('/userSignUpPost', controllers.signUpPost)

Router.post('/userLogInPost', controllers.logInPost, cookieHandler.sendCookie)

Router.get('/user/listShops', cookieHandler.cookieRecieved, controllers.listShops)

Router.get('user/shops/listProducts', controllers.listProducts)


export default Router