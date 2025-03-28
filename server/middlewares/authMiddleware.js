import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization") || ""; // Get token from headers

  try {
    // Verify Token
    const decoded = jwt.verify(token.split(" ")[1], "JWT Secret");

    // Fetch user details
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Attach user info to request
    req.user = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    next(); // Proceed to next middleware or route
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
