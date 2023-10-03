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
        testCases:{type:Array,default:[]},
        sampleCases:{type:Array,default:[]},
        points:
        {
            type:Number,
            default:50
        },
        difficultyLevel:
        {
            type:Number,
            default:2
        },
        defaultCode:
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