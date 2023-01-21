const mongoose=require('mongoose');

const newcode=new mongoose.Schema(
    {
        code:
        {
            type:String,
            required:true,
            default:" "
        },
        userid:
        {
            type: mongoose.Schema.Types.ObjectId
        },
        questionid:
        {
            type: mongoose.Schema.Types.ObjectId
        }
        
    },
    {
        timestamps:true
    }
)

const Code=new mongoose.model('codes',newcode);
module.exports=Code;