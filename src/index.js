import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";
dotenv.config({ path: "./env" })

const port = process.env.PORT || 4000

connectDB().then(() => {
    app.on('error',(err) => {
        console.log("Server runnnig error ", err)
    })
    app.listen(port, () => {
        console.log("Server is listing on port " + port)
    })
}).catch((error) => {
    console.log("connection is Failed: " + error)
})