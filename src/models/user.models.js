import { jwt } from "jsonwebtoken";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avtar: {
        type: String, // use  cloudnary services 
        required: true,
    },
    coverImage: {
        type: String,
    },
    watchHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken: {
        type: String,
    }
}, { timestamps: true })


// code for incrypt the password before save the password and  update the password
userSchema.pre("save", async function (next){
    if(this.modified("password")){
         return next()
    }
    this.password = await bcrypt.hash(this.password, 8 )
    next()
})

userSchema.method.isPasswordCorrect= async function(password){
    return  await bcrypt.compare(password, this.password)
}

// generate the AccessToken
userSchema.method.genarateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// generate the refresh token 
userSchema.method.genarateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,  
        },
        process.env.REFRESS_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESS_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User', userSchema)