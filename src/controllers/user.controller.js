import { APIError } from "../utils/apiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const registerUser = asyncHandler(async (req, res) => {

    const { username, email, fullName, password } = req.body;

    if ([username, email, fullName, password].some((item)=>item?.trim() === "")) {
         throw new APIError(400,"All fields are Required")
    }

    const existedUser = await User.findOne({ $or: [{ username}, {email}]})
    if (existedUser) {
        throw new APIError(409,"User with username and email already exists")
    }
  
    const avatarLocalpath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    
    if (!avatarLocalpath) {
        throw new  APIError(400, "Avatar is required")
    }
       
   const avatar = await  uploadonCloudinary(avatarLocalpath)
   const coverImage = await uploadonCloudinary(coverImageLocalPath)

   if (!avatar) {
     throw new APIError(400, "Avatar is required")
   }

   const newUser = await User.create({
    username: username.toLowerCase(),
    email: email,
    password: password,
    fullName,
    avatar:avatar.url,
    coverImage: coverImage?.url || ""
   })

   const createdUser = await User.findById(newUser._id).select("-password -refreshToken")

   if (!createdUser) {
      throw new APIError(500, "Something went wrong while registering the user")
   }
   
   return res.status(201).json(new ApiResponse(200, createdUser, "User Register SucessFully"))
})


export  {registerUser} ;