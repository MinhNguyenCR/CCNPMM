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
  image: {
    type: String,
    default: 'https://via.placeholder.com/300x300?text=No+Image'
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
  isActive: {
    type: Boolean,
    default: true,
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
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ name: "text", description: "text" });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
