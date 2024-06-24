import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        mongoose.connect("mongodb+srv://agostinaferlat:proyectobackend21@proyectobackend.qeigiad.mongodb.net/ProyectoCoderhouse")
        console.log("MongoDB connected");
        
    } catch (error) {
        console.log(`Error: ${error}`);
    }
    
}