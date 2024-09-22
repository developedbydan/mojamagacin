import Supplier from "../models/supplierModel.js";

// Dohvatanje svih dobavljaca
export const getSuppliers = async (req, res) => {
  try {
    const userId = req.user.id;
    const suppliers = await Supplier.find({ user: userId });

    res.status(200).json(suppliers);
  } catch (err) {
    res.status(500).json({ message: "Greška pri dohvatanju dobavljača.", err });
  }
};

// Kreiranje novog dobavljaca
export const createSupplier = async (req, res) => {
  try {
    const { name, address, contact } = req.body;
    const userId = req.user.id;

    const existingSupplier = await Supplier.findOne({
      name: name,
      user: userId,
    });
    if (existingSupplier) {
      return res
        .status(400)
        .json({ message: "Dobavljač sa tim imenom već postoji." });
    }

    const newSupplier = new Supplier({
      name: name,
      address: address,
      contact: contact,
      user: userId,
    });

    const savedSupplier = await newSupplier.save();

    res.status(201).json(savedSupplier);
  } catch (err) {
    res.status(500).json({ message: "Greška pri dodavanju dobavljača.", err });
  }
};

// Azuriranje dobavljaca
export const updateSupplier = async (req, res) => {
  try {
    const { name, address, contact } = req.body;
    const { id } = req.params;
    const userId = req.user.id;

    const existingSupplier = await Supplier.findOne({ _id: id, user: userId });
    if (!existingSupplier) {
      return res.status(404).json({ message: "Dobavljač nije pronađen." });
    }

    existingSupplier.name = name | existingSupplier.name;
    existingSupplier.address = address | existingSupplier.address;
    existingSupplier.contact = contact | existingSupplier.contact;

    const updatedSupplier = await existingSupplier.save();

    res.status(200).json(updatedSupplier);
  } catch (err) {
    res.status(500).json({ message: "Greška pri ažuriranju dobavljača.", err });
  }
};

// Brisanje dobavljaca
export const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deletedSupplier = await Supplier.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!deletedSupplier) {
      return res.status(404).json({ message: "Dobavljač nije pronađen." });
    }

    res.status(200).json({ message: "Dobavljač je uspešno obrisan" });
  } catch (err) {
    res.status(500).json({ message: "Greška pri brisanju dobavljača", err });
  }
};
