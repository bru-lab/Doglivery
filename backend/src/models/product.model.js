import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
  },

  category: {
    type: String,
    enum: ["classic", "spicy", "vegan", "combo"],
  },

  available: {
    type: Boolean,
    default: true,
  },

}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;