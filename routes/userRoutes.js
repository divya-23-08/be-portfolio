// const express = require("express").router();
// const axios=require("axios");
// const User = require("../models/User");

// Router.get("/list", async(req, res) => {
//   // const response = await fetch("https://jsonplaceholder.typicode.com/users");
//   // const data=await response.json();
//   // const response = await axios.get("https://jsonplaceholder.typicode.com/users");
//   const users= await User.find();
//   console.log("users List:::",users);

//   const data= response.json();
//   res.status(200).json({ message: "user route" });
// });
// Router.put("/update:id",async(req,res)=>{
//   try {
//     const id=req.params.id;
//     const bodyData=req.body;
//     console.log("param id:::",id,username);
//     const updateUser=await User.findByIdAndUpdate(id,username,{
//       new:true,
//     });
//   } catch (error) {
//     console.log("error in register route",error);

//   }

// })

// // export default Router;
// module.exports = router;
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.log("Error in get users route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// UPDATE USER
router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const username = req.body;

    console.log("param id :::", id, username);

    const updatedUser = await User.findByIdAndUpdate(id, username, {
      new: true,
    });

    console.log("updatedUser :::", updatedUser);

    res.status(200).json({
      message: "Updated Successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log("Error in /update route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE USER
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    console.log("param id :::", id);

    const deletedUser = await User.findByIdAndDelete(id);

    console.log("deletedUser :::", deletedUser);

    res.status(200).json({
      message: "Deleted Successfully",
      data: deletedUser,
    });
  } catch (error) {
    console.log("Error in /delete route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;