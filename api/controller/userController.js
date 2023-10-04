const User = require("../model/user")
module.exports.getUser=async(req,res,next) =>
{
    try{
        const username=req.params.id;
        if(username)
        {
             const user=await User.find({username:username})
             .select("-password")
             if(user)
             {
                 return res.status(200).json({status:200,user});
             }
             else
             {
                 return res.status(404).json({status:404,message:"User Not found!"});
             }
        }
        else
        {
            return res.status(404).json({status:404,message:"Username not defined"});
        }
        
    }catch (err) 
    {
        return res.status(500).json({status:500,mesaage:err.message})
    }
}
module.exports.getMinidata=async(req,res,next) =>
{
    try{
        const user=await User.findById(req.user._id)
        .select("username _id email name")
        if(user)
        {
            return res.status(200).json({status:200,user});
        }
        else
        {
            return res.status(404).json({status:404,message:"User Not found!"});
        }
    }catch (err) 
    {
        return res.status(500).json({status:500,mesaage:err.message})
    }
}