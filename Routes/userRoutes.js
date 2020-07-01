import express from 'express'
import controllers from '../Controllers/userController.js'
import cookieParser from 'cookie-parser'
import cookieHandler from './cookies.js'

const Router = express()

Router.use(cookieParser())

Router.get('/userSignUpPage', controllers.signUpPage)

Router.post('/userSignUpPost', controllers.signUpPost)

Router.post('/userLogInPost', controllers.logInPost, cookieHandler.sendCookie)

Router.get('/user/listShops', cookieHandler.cookieRecieved, controllers.listShops)

Router.get('/user/listShopsWithCategory/:Category', controllers.listShopsWithCategory)

//Router.get('/user/listProductsWithCategory/:Category', controllers.listProductsWithCategory)

Router.get('/user/shops/listProducts/:id', controllers.listProducts)

Router.post('/bookProduct/:id',cookieHandler.cookieRecieved, controllers.bookProduct)

Router.post('/productDelivered/:id',cookieHandler.cookieRecieved, controllers.productDelivered)

export default Router