import mongoose from "mongoose";
export const dbConnection = async()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log(`mongodb connected on ${connection.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}
