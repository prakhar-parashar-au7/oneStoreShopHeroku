import express from 'express'
import path from 'path'
import hbs from 'hbs'
import bodyparser from 'body-parser'
import cookieParser from 'cookie-parser'

import router from './Routes/userRoutes.js'
import shopkeeperRouter from './Routes/shopkeeperRoutes.js'

import './Models/db_connect.js'

const app = express()

app.set('view engine', 'hbs')
app.set('views',  'views')
app.use(express.static('./views'))

app.use(express.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(cookieParser())

app.use(router)
app.use(shopkeeperRouter)

app.get('/', function(req, res) {    
    res.render('homePage')
})

app.listen(process.env.PORT||3000, () => {
    console.log('Server listening on port 3000')
})

