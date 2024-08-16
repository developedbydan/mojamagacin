import Product from "../models/productModel.js";

// Kreiranje novog proizvoda
export const createProduct = async (req, res) => {
  try {
    const { name, category, quantity, price, supplier } = req.body;

    const newProduct = new Product({
      name,
      category,
      quantity,
      price,
      supplier,
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

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Greška pri odhvatanju proizvoda." });
  }
};
