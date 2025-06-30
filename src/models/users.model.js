import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            index:true,
            lowercase:true,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,  
        },
        fullname:{
            type:String,
            required:true,
            trim:true,
            index:true,
        },
        avatar:{
            type:String,    //URL from cloudinary
            required:true,
        },
        coverImage:{
            type:String,    //URL from cloudinary
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        refreshToken:{
            type:String,
        },
        watchHistory:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Video",
            },
        ],

    },
    { timestamps: true });


//here we have 1 problem , whenever we do any change like change in username or anything else
//the pre hook will hash the password again and again.

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    // now the pre hook will not hash the password if there is no change is password field.
        

    this.password = bcrypt.hash(this.password, 10);
    next();
        //In Mongoose middleware, next() is how you tell Mongoose:
        // I’m done with whatever work I needed to do now move on to the next middleware 
        // or actually do the save. If you don’t call next(), the save operation never completes.
        // The request will hang, because Mongoose is waiting for you to say: I’m done.
})

//now lets check that the decrypted password is same as users input password or not
userSchema.method.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password); //return either true or false
}


userSchema.method.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.method.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}




export const User = mongoose.Model("User", userSchema);