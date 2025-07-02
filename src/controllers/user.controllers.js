import { asyncHandler } from "../utils/asyncHandler.js";
import { APIerror } from "../utils/APIerrors.js";
import { User } from "../models/users.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { APIresponses } from "../utils/APIresponses.js";

const registerUser = asyncHandler(async(req, res) => {
    /*
        *Get data from user via frontend 
        *Validation - must not empty
        *Check the user already exist or not
        *Files(images) are there or not (avatar is required)
        *upload them to cloudinary
        *create object for user - create db call to enter the user
        *remove the password and the refresh token field
        *check for user creation 
        *return response 
    */


    const {username, email, fullname, password} = req.body
    //console.log("username : ", username);

/*
    //Do check like that for every field {username, email, fullname, password}
    if(fullname===""){
        throw new APIerror(400, "fullname is required !")
    }
*/

    //OR use this syntax
    if([username, email, fullname, password].some((fields) => fields?.trim() === "")){
        //Checking all fields that after trimming they are empty if yes then throwing error
        throw new APIerror(400, "All fields are required");
    }
    
    const existedUser = await User.findOne({
        $or:[{ username }, { email }],
    })

    if(existedUser){
        throw new APIerror(409, "username or email already exist !");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new APIerror(400, "Avatar file is required !");
    }
    
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);   

    if(!avatar){// was throwing error because we did not returned the response from cloudinary utility
                // (/utils/cloudinary.js) after successfully uploading the file to cloudinary.
        throw new APIerror(400, "Avatar file is required !");
    }

    const user = await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase(),
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"   //fields i don't want will be written here with negative sign and separated by spaces.
    );

    if(!createdUser){
        throw new APIerror(500, "Something went wrong while registering the user !");
    }

    return res.status(201).json(
        new APIresponses(200, createdUser, "User registered successfully !")
    );

});

export {registerUser};