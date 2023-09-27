const express = require("express");
const app = express();
const mongoose =require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")
const productRoutes = require("./routes/product")
// const cartRoutes = require("./routes/cart")
const cartRoutes = require("./routes/cart")
const OrderRoutes = require("./routes/order")
//middleware
app.use(express.json())
dotenv.config()

mongoose.connect(
   process.env.MONGO_DB_LINK

).then(()=>{console.log("Connected to Mongo DB")})
 .catch((err)=>{console.log(err) })

app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/products",productRoutes);
app.use("/api/carts",cartRoutes)
app.use("/api/orders",OrderRoutes)
// app.use('/api/auth',authRoutes)


app.listen(5000,()=>{
    console.log("server is running on port 50000")
})