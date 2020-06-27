import expressValidator from 'express-validator'

const {check, validationResult} = expressValidator


const validations = {

    signUp : [body("userName").isEmpty(),
              body("password").isLength({min : 5})
], (req, res) => { v

}



}