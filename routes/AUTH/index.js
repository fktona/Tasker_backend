const {register} = require('../../controller/AUTH/auth');
const {login} = require('../../controller/AUTH/login');
//const {logout} = require('../../controller/AUTH/auth');
const {verifyToken , protectedRoute} = require('../../controller/AUTH/refresh');
const router = require('express').Router();

router.post('/signup' , register , login)
router.post('/signin' , login)
//router.post('/signout' , register)
router.post('/refresh' , verifyToken, protectedRoute) 

module.exports = router