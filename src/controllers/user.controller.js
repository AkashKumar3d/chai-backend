import { APIError } from "../utils/apiErrors.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {User} from "../models/user.models.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const registerUser = asyncHandler(async (req, res) => {

    const {username, email, fullname, password} = req.body;

    if ([username, email, fullname, password].some((item)=>item.trim() == "")) {
         throw new APIError(400,"All fields are Required")
    }

    const exitsUser = User.findOne({$or:({username},[email])})
    if (exitsUser) {
        throw new APIError(409,"User with username and email already exists")
    }

    const avatarLocalpath = req.files?.avtar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalpath) {
        throw new  APIError(400, "Avatar is required")
    }
       
   const avtar = await  uploadonCloudinary(avatarLocalpath)
   const coverImage = await uploadonCloudinary(coverImageLocalPath)

   if (!avtar) {
     throw new APIError(400, "Avatar is required")
   }

   const User = await User.create({
    username: username.toLowerCase(),
    email: email,
    password: password,
    fullname,
    avtar:avtar.url,
   })

   const createdUser = await User.findById(User._id).select("-password -refreshToken")

   if (!createdUser) {
      throw new APIError(500, "Something went wrong while registering the user")
   }
   
   return res.status(201).json(new ApiResponse(200, createdUser, "User Register SucessFully"   ))
})


export  {registerUser} ;