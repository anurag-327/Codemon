const express=require("express");
const app=express();
const cors=require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const PORT=process.env.PORT||5000;
const mongoose=require("./config/mongoose");
// app.use(express.static(__dirname));

app.get("/",(req,res)=>
{
    return res.json("Server Running Successfully");
})

// auth api's
app.use("/api/auth",require("./routes/auth"))

//compiler api's
app.use("/api/v1/compiler",require("./routes/compiler"))
//solver api's
app.use("/api/v1/solve",require("./routes/solve"))
// data api's
app.use("/api/v1/data",require("./routes/data"))
// api to update database
app.use("/api/v1/update",require("./routes/update"))
app.listen(PORT,(err)=>
{
    if(err)
      console.log("Error setting up express")
    console.log("Server running successfully at",PORT)  
})