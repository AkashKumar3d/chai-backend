// mongodb+srv://mailtoakashit:<password>@akashdev.wfdmwmw.mongodb.net/
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app =express();

// middlewares

// initgarte the middleware for solving the cors error 
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

/// initigrated this middleware for set the json data limit setup 
app.use(express.json({limit:"20kb"}))

// intigrated the middleware for set the url data get and limit setup 
app.use(express.urlencoded({extended:true, limit:"20kb"}))

// initigarted the middleware for track the public folder 
app.use(express.static("public"))

// initigarted the middleware for cookies parser
app.use(cookieParser())


//  import routes
import  userRouter  from "./routes/user.routes.js";

// routes decalartion
app.use("/api/v1/user", userRouter)


export default app;
