const connection = require("../db");
const { productCategories } = require("../utils/products");

const productSchema = new connection.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      text: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: Object.values(productCategories),
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

productSchema.index({ name: 'text' });

module.exports = connection.model("product", productSchema);
