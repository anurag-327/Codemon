const mongoose=require('mongoose');
const userdetails=new mongoose.Schema(
    {
        userid:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'users'
       },
        username:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        }, 
        userpoints:{
            type:Number,
            default:50
        },
        questionssolved:{type:Array,default:[]},
    },
    {
        timestamps:true
    }
)