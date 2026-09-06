import mongoose from 'mongoose';

const connectDB = async (req, res) => {

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected!!!")
    } catch (error) {
        console.log("Error connecting to database", error);
        process.exit(1);
    }
}

export default connectDB;