const jwt=require("jsonwebtoken")
module.exports.verifyToken=async(req,res,next) =>
{
    try{
        const authHeader=req.headers.authorization
        if(authHeader && authHeader.startsWith("Bearer"))
        {
            try{
                const token=authHeader.split(' ')[1];
                jwt.verify(token,process.env.JWT_SEC_KEY,async (err,user) =>
                {
                    if(err) return res.status(403).json({status:403,mesaage:"Invalid token"});
                    req.user={_id:user._id};
                    next();
                })
            }catch(err)
            {
                return res.status(401).json({status:401,mesaage:"Authorisation failed"})
            }
        }
        else
        {
            return res.status(401).json({status:401,mesaage:"No token provided/Invalid token"})
        }
    }catch (err) 
    {
        return res.status(500).json({status:500,mesaage:err.message})
    }
}