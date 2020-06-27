
const cookieHandler = {
    sendCookie : (req, res) => {
        res.cookie("name", req.body.token, {  httpOnly: true }).json({message :"Cookie has been sent",
        token : req.body.token})
        },
    cookieRecieved : (req, res, next) => {
        const token = req.cookies.name
        req.body.token = token
        next()
    }
        
    }



export default cookieHandler        