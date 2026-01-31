const router =require('express').Router();
const bcrypt=require("bcrypt js");

router.post("/login",async(req,res)=>{
    try{
        console.log(req.body);
        const{email,password}=req.body;
        const user=await User.findOne({email});
        console.log("Found user",user);
        if(!user){
            return res.status(400).json({message:"invalid email or password"});
        }
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
    return res.status(401).json({message:"Invalid credentials"});
}  
const token= await JsonWebTokenError.sign({username:user.username,email:user.email},process.env.JWT_SECRET,{expires:"1h"},)
  res.status(200).json({message:"Login route sucessfully",token});
    }catch(errror){
        console.log("Error in login router:",error);
        res.status(500).json({message:"Internal server Error"});

    }

});
router.post("/register",async (req,res)=>{
    try {
        console.log(req.body);
        const{username,email,password}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400)
            .json({message:"User with this username already exist"})
        }
        const hashPassword=await bcrypt.hash(password,10);
        console.log("Hashed password",hashpassword);
        const user=await User.create({
            username,
            email,
            password:hashpassword,
        });
        res.status(201).json({ message: "User created successfully",data:user });
    } catch (error) {
        console.log("Error in/register route",error);
        res.status(500).json({message:"Internal server error"});
        
    }
    // console.log(req.body);
    // res.status(201).json({message: "Register router"});
    
});

// export default Router;
module.exports=router;
