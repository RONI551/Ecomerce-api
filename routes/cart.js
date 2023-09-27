

const Cart = require("../models/Cart");
const {
  veryfyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./veryfyToken");

const router = require("express").Router();

//CREATE

router.post("/", veryfyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


/////////////////////////////////////////////////////////////////



// const router = require("express").Router()
// const Cart = require("../models/Cart");
// const { verifyTokenAndAdmin, veryfyToken, verifyTokenAndAuthorization } = require("./veryfyToken");



// //ADD PRODUCT IN CART
// router.post("/",veryfyToken,async (req,res) => {

//     const newCart = new Cart(req.body)
//     try{
//         const savedCart = await newCart.save();
//         res.status(200).json(savedCart);
        
//     }catch(err){
//         res.status(500).json(err)
//     }

// })

// //UDPATE cart  
// router.put("/:id", veryfyToken, async (req, res) => {
//     try {
//       const updatedCart = await Cart.findByIdAndUpdate(
//         req.params.id,
//         {
//           $set: req.body,
//         },
//         { new: true }
//       );
//       res.status(200).json(updatedCart);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  

// // //DELETE

// router.delete("/:id",verifyTokenAndAuthorization ,async (req,res) => {

//     try{
//         await Cart.findByIdAndDelete(req.params.id)
//         res.status(200).json("cart item is successfully deleted")
//     }catch(err){
//         res.status(500).json(err)
//     }

//  }
// )

// //GET user cart 

// router.get("/find/:userId",verifyTokenAndAuthorization, async (req,res)=>{
//     try{
//         const cart = await Cart.findOne({userId: req.params.userId});
        
//         res.status(200).json(cart)
//     }catch(err){res.status(500).json(err)}
// })

// //GET all cart

// router.get("/",verifyTokenAndAdmin,async (req,res)=>{
//     try{
//         const carts = await Cart.find()
//         res.status(200).json(carts)
//     }catch(err){
//         res.status(500).json(err)
//     }
// })


// module.exports = router