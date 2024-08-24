import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
  suppliers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Suppliers" }],
});

const User = mongoose.model("User", userSchema);

export default User;
