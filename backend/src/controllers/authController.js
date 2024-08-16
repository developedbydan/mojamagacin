import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve("src/.env") });

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  console.error("JWT_SECRET nije definisan u .env fajlu");
  process.exit(1);
}

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Provera da li korisnik već postoji
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // Generisanje salt-a za hashovanje lozinke
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Kreiranje novog korisnika
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Čuvanje korisnika u bazi
    const savedUser = await newUser.save();

    // Generisanje JWT tokena
    const token = jwt.sign({ _id: savedUser._id }, jwtSecret, {
      expiresIn: "1h",
    });

    // Vraćanje odgovora sa tokenom
    res.status(201).json({ token });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Registration failed.", err });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or passowrd." });
    }

    const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: "1h" });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed.", err });
  }
};
