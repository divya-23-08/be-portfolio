// console.log("hello world");
// console.log("This example for nodemon works");
// const http=require("http");
// const PORT=5000;

// const server=http.createServer((req,res)=>{
    // res.writeHead(200,{"content-type":"text/plain"})
//     res.end("Hello from portfolio backend server");
// });

// server.listen(PORT,()=>{
//     console.log(`Server islistening on port ${port}`);
// });

const express=require("express");
const cors=require("cors");
const authRoutes =require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const mongoose=require("mongoose");
const dotenv=require("dotenv");

const app=express();
app.use(cors());
app.use(express.json());

dotenv.config();

const PORT=process.env.PORT || 5000;
const MONGO_URI=process.env.MONGO_URI ||"";
console.log("PORT from env:",PORT,process.env.MONGO_URI);
app.use("/auth",authRoutes);
app.use("/user",userRoutes);


mongoose
.connect(process.env.MONGO_URI)
  .then(()=>{
    console.log("Connected to mongodb");
})
.catch((error)=>{
    console.log("error connecting to mongodb:",error);
});
// app.get("/",(req,res)=>{
//     res.status(200).json({message:"hello from portfolio backend server"});
//     // res.send("Hello from portfolio backend server");
// });
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);

})

