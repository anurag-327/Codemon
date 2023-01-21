const mongoose=require('mongoose');

const newques=new mongoose.Schema(
    {
        question:
        {
            type:String,
            required:true
        },
        description:
        {
            type:String,
            required:true
        },
        input_output:
        {
            sample1:
            {
                input1:{
                    type:String,
                    required:true
                },
                output1:
                {
                    type:String,
                    required:true
                }
            },
            sample2:
            {
                input2:{
                    type:String,
                    required:true
                },
                output2:
                {
                    type:String,
                    required:true
                }
            }
            
        },
        testcases:{type:Array,default:[]},
        questionpoints:
        {
            type:Number,
            default:50
        },
        difficultylevel:
        {
            type:String,
            default:"medium"
        },
        defaultcode:
        {
            type:String
        }
        
    },
    {
        timestamps:true
    }
)

const Newques=new mongoose.model('questions',newques);
module.exports=Newques;