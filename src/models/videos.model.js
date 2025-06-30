    import mongoose, { Schema } from "mongoose";
    import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
    
    const videoSchema = new mongoose.Schema(
        {
            videoFile:{
                type:String,    //URL from cloudinary
                required:true,
            },
            thumbnail:{
                type:String,    //URL from cloudinary
                required:true,
            },
            owner:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
            },
            title:{
                type:String,    
                required:true,
            },
            description:{
                type:String,
                required:true,
            },
            duration:{
                type:Number,    //Length from from cloudinary
                required:true,
            },
            views:{
                type:Number,
                default:0,
            },
            isPublished:{
                type:Boolean,
                default:true,
            },
        },
        { timestamps: true });


        videoSchema.plugin(mongooseAggregatePaginate)
    
        export const User = mongoose.Model("User", userSchema);