import Category from "../models/categoryModel.js";

// Dohvatanje svih kategorija
export const getCategories = async (req, res) => {
  try {
    const userId = req.user._id;
    const categories = await Category.find({ user: userId });

    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Greška pri odhvatanju kategorija.", err });
  }
};

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

// Azuriranje kategorije
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user._id;

    const existingCategory = await Category.findOne({ _id: id, user: userId });

    if (!existingCategory) {
      return res.status(400).json({ message: "Kategorija nije pronađena." });
    }

    existingCategory.name = name || existingCategory.name;

    const updatedCategory = await existingCategory.save();

    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json({ message: "Greška pri ažuriranju kategorije.", err });
  }
};

// Brisanje kategorije
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const deletedCategory = await Category.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!deletedCategory) {
      return res.status(404).json({ message: "Kategorija nije pronađena." });
    }

    res.status(200).json({ message: "Kategorija je uspešno obrisana." });
  } catch (err) {
    res.status(500).json({ message: "Greška pri brisanju kategorije.", err });
  }
};
