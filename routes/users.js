
const User = require("../models/User");
const { veryfyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin } = require("./veryfyToken");
const CryptoJs = require("crypto-js")
const router = require("express").Router(); 

//UPDATES
router.put("/:id",verifyTokenAndAuthorization,async (req,res) => {
    if(req.body.password){
        req.body.password =  CryptoJs.AES.encrypt(req.body.password, process.env.SALT_CODE, process).toString();
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true});
        res.status(200).json(updatedUser);
        
    }catch(err){
        res.status(500).json(err)
    }

})

//DELETE

router.delete("/:id",verifyTokenAndAdmin,async (req,res) => {

    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user is successfully deleted")
    }catch(err){
        console.log(err)
    }

 }
)

//GET ONE USER

router.get("/find/:id",verifyTokenAndAuthorization, async (req,res)=>{
    try{
        const user = User.findById(req.params.id);
        const {password,...others} = user._doc;
        res.status(200).json(others)
    }catch(err){res.json(err)}
})

//GET ALL USER 

router.get("/",verifyTokenAndAuthorization, async (req,res)=>{
    try{
        const users = await User.find().sort({_id:-1}).limit(5)
        res.status(200).json(users)
    }catch(err){
        res.status(403).json(err)
    }
    
})

//GET STATS

router.get("/stats", verifyTokenAndAdmin, async (req,res)=>{
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1))

    try{
        const data = await User.aggregate([
            {$match: { createdAt: { $gte: lastYear}} },
            {
                $project:{
                    month:{ $month: "$createdAt" }
                }
            },
            {
                $group:{
                    _id: "$month",
                    total:{$sum:1}
                }

            }
        ])
        console.log("err is here")
        res.status(200).json(data)
    }catch(err){
        res.status(403).json(err)
    }
})
module.exports = router