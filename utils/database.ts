// hook up to database
import mongoose, { ConnectOptions, mongo } from "mongoose";

let isConnected = false; // kepp track of the connection

export const connectToDB = async () => {
    mongoose.set('strictQuery',true);

    if(isConnected){
        console.log('MongoDB is already connected');
        return;
    }

    // If it is not connected

    try {
        if(process.env.MONGODB_URI)
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true 
        } as ConnectOptions)

        isConnected = true;

        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
}