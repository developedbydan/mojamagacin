import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve("src/.env") });

// TODO: JWT
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

    const payload = { id: user._id };

    // Generiši access i refresh token
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    // Postavi access token u HTTP-only kolacic
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000, // 15 minuta
    });

    // Postavi refresh token u HTTP-only kolacic
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dana
    });

    res.status(200).json({ username: user.username, token: accessToken });
  } catch (err) {
    res.status(500).json({ message: "Prijava nije uspešna", err });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  res.clearCookie("refresh_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  res.status(200).json({ message: "Uspešna odjava" });
};

export const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token nije dostavljen." });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Nevažeći refresh token" });
    }

    // Generisi novi access token
    const newAccessToken = jwt.sign(
      { id: payload.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000, // 15 minuta
    });

    res.status(200).json({ message: "Access token obnovljen." });
  });
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("username");

    if (!user) {
      return res(404).json({ message: "Korisnik nije poronađen." });
    }

    res.status(200).json({ username: user.username });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Greška prilikom dobavljanja korisničkih podataka." });
  }
};
