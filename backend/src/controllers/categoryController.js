import Category from "../models/categoryModel.js";

// Kreiranje nove kategorije
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Korisnicki id
    const userId = req.user._id;

    const newCategory = new Category({
      name: name,
      user: userId,
    });

    // Cuvanje proizvoda u bazi
    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json({ message: "Greška pri dodavanju kategorije.", err });
  }
};
