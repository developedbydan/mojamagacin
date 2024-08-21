import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";

// Kreiranje novog proizvoda
export const createProduct = async (req, res) => {
  try {
    const { name, category, quantity, price, supplier } = req.body;

    // Korisnicki id
    const userId = req.user._id;

    //Provera kategorije
    const categoryDoc = await Category.findOne({ _id: category, user: userId });
    if (!categoryDoc) {
      return res.status(400).json({ message: "Kategorija nije validna." });
    }

    const newProduct = new Product({
      name,
      category,
      quantity,
      price,
      supplier,
      user: userId,
    });

    // Cuvanje proizvoda u bazi
    const savedProduct = await newProduct.save();

    // Uspesan odgovor
    res.status(201).json(savedProduct);
  } catch (err) {
    // Odgovor sa greskom
    res.status(500).json({ message: "Greška pri dodavanju proizvoda.", err });
  }
};

// Dohvatanje svih proizvoda
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Greška pri odhvatanju proizvoda.", err });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, quantity, price, supplier } = req.body;
    const userId = req.user._id;

    // Provera da li proizvod postoji i pripada trenutnom korisniku
    const existingProduct = await Product.findOne({ _id: id, user: userId });

    if (!existingProduct) {
      return res.status(400).json({ message: "Proizvod nije pronađen." });
    }

    // Provera kategorije ako se azurira
    const categoryDoc = await Category.findOne({ _id: category, user: userId });
    if (!categoryDoc) {
      return res.status(400).json({ message: "Kategorija nije validna." });
    }

    existingProduct.name = name || existingProduct.name;
    existingProduct.category = category || existingProduct.category;
    existingProduct.quantity = quantity || existingProduct.quantity;
    existingProduct.price = price || existingProduct.price;
    existingProduct.supplier = supplier || existingProduct.supplier;

    const updatedProduct = await existingProduct.save();

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: "Greška pri ažuriranju proizvoda.", err });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const deletedProduct = await Product.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!deletedProduct) {
      return res.status(404).json({ message: "Proizvod nije pronađen." });
    }

    res.status(200).json({ message: "Proizvod je uspešno obrisan." });
  } catch (err) {
    res.status(500).json({ message: "Greška pri brisanju proizvoda.", err });
  }
};
