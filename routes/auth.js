const router = require('express').Router();
const  User = require('../models/User');
const CryptoJs = require("crypto-js")
const jwt = require("jsonwebtoken")
//REGISTER 
router.post('/register', async (req,res)=>{

   const HashedPassword =  CryptoJs.AES.encrypt(req.body.password, process.env.SALT_CODE, process);

    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:HashedPassword,
        
    })

    try{
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    }catch(err){
        res.status(500).json(err)
    }
})

//LOG IN
router.get('/login', async (req,res)=>{
    const user = await User.findOne({
       username:req.body.username
      }) 
      !user && res.status(500).json("Wrong Credentials")

      const hasedPassword = CryptoJs.AES.decrypt(user.password, process.env.SALT_CODE)
      const DecryptedPassword = hasedPassword.toString(CryptoJs.enc.Utf8)

      req.body.password !== DecryptedPassword && res.status(500).json("Password is incorrect")

     //json web token  
      const AccessToken = jwt.sign({
        id:user._id,
        isAdmin:user.isAdmin
      },
      process.env.JWT_SALT
      ,{expiresIn:"3d"})
      const {password ,... others}= user._doc

      res.status(200).json({others,AccessToken}) 

})

module.exports = router