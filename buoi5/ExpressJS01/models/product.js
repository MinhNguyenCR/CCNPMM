const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
    enum: ["Electronics", "Books", "Clothing", "Home", "Other"],
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, min: 1, max: 5 },
      comment: String,
      date: { type: Date, default: Date.now },
    },
  ],
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
