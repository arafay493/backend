import mongoose , {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bycrypt from "bcryptjs"
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, //? Cloudinary Url
        required: true,
    },
    coverImage: {
        type: String, //? Cloudinary Url
        // required: true,
    },
    // watchHistory: {
        //     type: [Schema.Types.ObjectId],
        //     default: []
        // },
        watchHistory: [
            {
            type: Schema.Types.ObjectId,
            ref: "Video",
        }
    ],
    password: {
        type: String,
        required: [true , "Password is required"]
    },
    refreshToken: {
        type: String,
        default: null
    }
}, {timestamps: true})

export const User =  mongoose.model("User", userSchema)