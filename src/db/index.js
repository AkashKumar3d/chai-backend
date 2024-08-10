import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}?retryWrites=true&w=majority`)
        // const connectionInstance = await mongoose.connect(`mongodb://localhost:27017`)
        console.log(`connected Sucessfully with Db !! DB HOST : ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("mongoDb connection Failed", error)
    }
}

export default connectDB;