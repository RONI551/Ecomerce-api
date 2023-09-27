const jwt = require("jsonwebtoken")

//token verification function
const veryfyToken = (req,res,next)=>{
    const authHeader = req.headers.token
   
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.JWT_SALT,(err,user)=>{
            if(err) res.status(403).json("Token is invalid")
            req.user = user;
           next()
        })

    }else{
        res.status(401).json("Your are not authenticated")
    }
}

//authorization function
const verifyTokenAndAuthorization = (req,res,next)=>{
     veryfyToken(req,res,()=>{
        if(req.user.id ===req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(401).json("Your are not authenticated")
        }
     })
}

// tokenAndAdminVerification
const verifyTokenAndAdmin = (req,res,next)=>{
  veryfyToken(req,res,()=>{

    if(req.user.isAdmin){
        console.log(req.user.isAdmin)
        next()
    }else{
        res.status(403).json("You are not admin")
    }
  })
}

module.exports = {veryfyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin}