const mongoose=require('mongoose');
const userSchema= new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            minLength:5,
        },
        socialMedia:{
            github:{type:String,default:"Not Specified"},
            linkedin:{type:String,default:"Not Specified"},
            twitter:{type:String,default:"Not Specified"},
        },
        personalDetails:{
            gender:{type:String,default:"Not Specified"},
            location:{type:String,default:"Not Specified"},
            skills:{type:String,default:"Not Specified"},
            summary:{type:String,default:"Not Specified"},
        },
        userPoints:{
            type:Number,
            default:0
        },
        questionsSolved:[
           
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'questions'
            }
    ]},
    {
        timestamps:true
    }
);

const User=new mongoose.model('user',userSchema);
module.exports=User;