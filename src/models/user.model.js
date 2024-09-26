import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bycrypt from "bcryptjs";
const userSchema = new Schema(
  {
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
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
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
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  //   if (this.isModified("password")) {
  //     this.password = bycrypt.hash(this.password, 10);
  //   }
  if (!this.isModified("password")) return next();
  this.password = bycrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function () {
  const isMatch = await bycrypt.compare(this.password, this.password);
  return isMatch;
};

// userSchema.methods.generateAuthToken = async function () {
//   const user = this;
//   const token = jwt.sign(
//     {
//       id: user._id,
//       email: user.email,
//       username: user.username,
//       fullname: user.fullname,
//     },
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
//     }
//   );
//   user.refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });
//   await user.save();
//   return token;
// };

userSchema.methods.generateAccessToken = async function () {
  const user = this;
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
      fullname: user.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
  return token;
};

userSchema.methods.generateRefreshToken = async function () {
  const user = this;
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    }
  );
  user.refreshToken = token;
  await user.save();
  return token;
};

export const User = mongoose.model("User", userSchema);
