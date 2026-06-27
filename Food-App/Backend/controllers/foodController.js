import foodModel from "../models/foodmodel.js";

import fs from 'fs'

const addFood =async(req,res)=>{
   
     const image_filename = `${req.file.filename}`;

     const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        oldPrice:req.body.oldPrice,
        newPrice:req.body.newPrice,
        category:req.body.category,
        image:image_filename,
         isTodaysMeal: {type: Boolean, default: false }
     })
     try {
        await food.save();
        res.json({success:true,message:"Food added"})
     } catch (error) {
    console.log(error);
    res.status(400).json({
        success: false,
        message: error.message
    });
}
}

export {addFood}