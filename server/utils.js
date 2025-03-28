import mongoose from "mongoose";

const connectDB = async () => {
  console.log(process.env);
  try {
    await mongoose.connect(
      "mongodb+srv://gp:1amastudent@mernquiztestdb.mvyin.mongodb.net/?retryWrites=true&w=majority&appName=MERNQuizTestDB",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit process on failure
  }
};

export default connectDB;
