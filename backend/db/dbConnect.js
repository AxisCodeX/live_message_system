import mongoose from "mongoose";

async function connectDB() {
    console.log("Connecting to DB...");
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URI);
        console.log("MongoDB connected:", connection.connection.host);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}

export default connectDB;