import express from 'express'
import controllers from '../Controllers/userController.js'
import cookieParser from 'cookie-parser'
import cookieHandler from './cookies.js'

const Router = express()

Router.use(cookieParser())

Router.get('/userSignUp', controllers.signUpPage) 

Router.post('/userSignUpPost', controllers.signUpPost)

Router.get('/userLogInPage', controllers.logInPage)

Router.post('/userLogInPost', controllers.logInPost, cookieHandler.sendCookie)

Router.get('/user/listShops', cookieHandler.cookieRecieved, controllers.listShops)


export default Router