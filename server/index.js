import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";
import connectDb from "./utils.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Email from "./models/Email.js";
import authMiddleware from "./middlewares/authMiddleware.js";

await connectDb();

const SECRET = "JWT Secret";
const app = express();
dotenv.config();
const port = 3000;

app.use(cors());
app.use(express.json());

// Mock data
const emails = [
  {
    id: 1,
    from: "john@example.com",
    subject: "Meeting Tomorrow",
    body: "Hi, let's meet tomorrow at 10 AM.",
    date: "2024-03-10T10:00:00.000Z",
    read: false,
    starred: false,
  },
  {
    id: 2,
    from: "sarah@example.com",
    subject: "Project Update",
    body: "Here's the latest update on the project...",
    date: "2024-03-09T15:30:00.000Z",
    read: true,
    starred: true,
  },
];

app.get("/api/emails", authMiddleware, async (req, res) => {
  console.log(req.user.email);
  const emails_recipients = await Email.find({
    recipient: req.user.email,
  });
  const emails_sender = await Email.find({
    sender: req.user.email,
  });
  res.json([...emails_recipients, ...emails_sender]);
});

app.post("/api/emails/send", authMiddleware, async (req, res) => {
  console.log("trying send");
  try {
    const sender = req.user.email;
    const { to: recipient, subject, body } = req.body;
    console.log(sender, subject, body);

    const email = new Email({
      sender,
      recipient,
      subject,
      body,
    });

    console.log(email);
    await email.save();
    console.log(email);
    res.status(201).json({ message: "Email saved successfully", email });
  } catch (error) {
    res.status(500).json({ message: "Error saving email", error });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/signup", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      username,
      password: hashedPassword,
      email,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/emails", (req, res) => {
  const newEmail = {
    id: emails.length + 1,
    ...req.body,
    date: new Date().toISOString(),
    read: false,
    starred: false,
  };
  emails.push(newEmail);
  res.status(201).json(newEmail);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
