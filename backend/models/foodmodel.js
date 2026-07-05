import mongoose from 'mongoose';

const foodschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String

    },
    oldPrice:{
        type:Number,
        required:true
    },
     newPrice:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})

const foodModel = mongoose.models.food || mongoose.model("food",foodschema)

export default foodModel;