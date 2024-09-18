// require('dotenv').config({path: './.env'});

import dotenv from 'dotenv'
import { connectDB } from "./db/index.js";
dotenv.config({
    path: './.env'
})
connectDB()















// ?? Approach
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
// import express from "express";
// const app = express();

// // ? Connect DB to Mongoose
// (async () => {
//     try {
//         // Connect to MongoDB
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });

//         app.on('error', (error) => {
//             console.error("Error connecting to MongoDB:", error.message);
//             // process.exit(1);
//             throw error;
//         })

//         app.listen(process.env.PORT , () => {
//             console.log(`Server is running on port ${process.env.PORT}`);
//         })
//     } catch (error) {
//         console.log("Error connecting to database: " + error)
//     }
// })()