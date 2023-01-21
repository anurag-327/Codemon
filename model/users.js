const mongoose=require('mongoose');

const userschema= new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        username:{
            type:String,
            
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },socialmedia:{
            github:{type:String,default:"Not Specified"},
            linkedin:{type:String,default:"Not Specified"},
            twitter:{type:String,default:"Not Specified"},
        },personaldetails:{
            gender:{type:String,default:"Not Specified"},
            location:{type:String,default:"Not Specified"},
            skills:{type:String,default:"Not Specified"},
            summary:{type:String,default:"Not Specified"},
        },
        userpoints:{
            type:Number,
            default:50
        },
        questionssolved:[{
            questionid:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'questions'
            },
    }]},
    {
        timestamps:true
    }
);

const User=new mongoose.model('users',userschema);
module.exports=User;