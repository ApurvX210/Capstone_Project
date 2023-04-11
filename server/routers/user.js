const express=require('express');
// controller function
const {loginUser,signupUser}=require('../controllers/usercontroller')
const requireAuth=require('../middleware/requireAuth')
const router =express.Router();

// router.use(requireAuth);
// login route
router.post('/login',loginUser)

// signup route
router.post('/signup',signupUser)

module.exports=router;