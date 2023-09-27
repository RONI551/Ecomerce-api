const router = require("express").Router()
const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./veryfyToken");



//CREATE
router.post("/",verifyTokenAndAdmin,async (req,res) => {

    const newProducts = new Product(req.body)
    try{
        const savedProduct = await newProducts.save();
        res.status(200).json(savedProduct);
        
    }catch(err){
        res.status(500).json(err)
    }

})

//UDPATE PRODUCT
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

//DELETE

router.delete("/:id",verifyTokenAndAdmin,async (req,res) => {

    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product is successfully deleted")
    }catch(err){
        res.status(500).json(err)
    }

 }
)

//GET ONE products

router.get("/find/:id", async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        
        res.status(200).json(product)
    }catch(err){res.status(500).json(err)}
})

//GET ALL PRoducts 

router.get("/", async (req,res)=>{
    const qNew = req.query.new
    const qCatagory = req.query.catagories
    let products;
    try{
     if(qNew){
      products = await Product.find().sort({createdAt:-1}).limit(5)
     }
     else if(qCatagory){
     products = await Product.find({
        catagories:{
            $in:[qCatagory]
        }
        
     })
    }
    else{
    products = await Product.find()
    }
  res.status(200).json(products)
  } 
    catch(err){
        res.status(403).json(err)
    }
  
})


module.exports = router