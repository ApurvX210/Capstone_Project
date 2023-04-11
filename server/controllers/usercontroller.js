const User=require('../models/userModel');
const jwt=require('jsonwebtoken');

const createToken=(_id)=>{
    return jwt.sign({_id},'Team210',{expiresIn:'1h'});
}
// login user
const loginUser= async (req,res)=>{
    const{email,password}=req.body;
    try {
        const user =await User.login(email,password);
        const token=createToken(user._id);
        const username=user.username;
        res.status(200).json({username,token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//signup user
const signupUser= async (req,res)=>{
    const {username,email,password}=req.body;
    console.log(username)
    try {
        const user =await User.signup(username,email,password);
        const token=createToken(user._id);
        res.status(200).json({username,token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
    
}
module.exports={loginUser,signupUser};