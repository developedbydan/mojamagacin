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
      return res.status(400).json({ message: "Email je već u upotrebi." });
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
    console.error("Greška tokom registracije", err);
    res.status(500).json({ message: "Registracija nije uspešna", err });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Pogrešan email ili lozinka" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Pogrešan email ili lozinka" });
    }

    const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: "1h" });

    // Postavljanje tokena u HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // 1 sat
    });

    res.status(200).json({ message: "Uspešna prijava" });
  } catch (err) {
    res.status(500).json({ message: "Prijava nije uspešna", err });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ message: "Uspešna odjava" });
  } catch (err) {
    res.status(500).json({ message: "Odjava nije uspešna.", err });
  }
};
