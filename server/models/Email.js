import mongoose from "mongoose";

const emailSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
    },
    recipient: {
      type: String,
    },
    subject: {
      type: String,
    },
    body: {
      type: String,
    },
    status: {
      type: String,
      enum: ["sent", "draft", "failed"],
      default: "sent",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

const Email = mongoose.model("Email", emailSchema);

export default Email;
