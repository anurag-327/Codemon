const mongoose=require('mongoose');

const newcode=new mongoose.Schema(
    {
        code:
        {
            type:String,
            required:true
        },
        
    },
    {
        timestamps:true
    }
)

const Code=new mongoose.model('codes',newcode);
module.exports=Code;