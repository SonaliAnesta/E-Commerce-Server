require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env.development"),
});
const mongoose = require("mongoose");
const Product = require("../models/product");
const { productCategories, brandsByCategory } = require("../utils/products");

// Utility to get a random item from an array
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Generate sample products
function generateSampleProducts(count = 5) {
  const categories = Object.values(productCategories);
  const sampleProducts = [];

  for (let i = 0; i < count; i++) {
    const category = getRandom(categories);
    const brand = getRandom(brandsByCategory[category]);
    const product = {
      name: `${brand} ${category} Product ${i + 1}`,
      description: `This is a description for ${brand} ${category} product ${i + 1}.`,
      category,
      brand,
      price: +(Math.random() * 50000 + 1000).toFixed(2), // LKR 1,000–50,000
    };
    sampleProducts.push(product);
  }

  return sampleProducts;
}

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const products = generateSampleProducts(5);
    await Product.insertMany(products);
    console.log(`✅ Seeded ${products.length} products successfully.`);
  } catch (err) {
    console.error("❌ Error seeding products:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seedProducts();