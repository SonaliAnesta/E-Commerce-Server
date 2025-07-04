const Product = require("../models/product");
const { formatErrorResponse, formatSuccessResponse } = require("../utils/api");
const { httpStatus } = require("../utils/constants");
const { brandsByCategory, productCategories } = require("../utils/products");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find().lean();
    const { status, result } = formatSuccessResponse(products);
    res.status(status).json(result);
  } catch (err) {
    console.error(err);
    const { status, message, error } = formatErrorResponse(
      "Products failed to load.",
      err
    );
    res.status(status).send({ message, error });
    return;
  }
};

const createProduct = async (req, res) => {
  try {
    const allowedCategories = Object.values(productCategories);

    if (!req.body.category || !allowedCategories.includes(req.body.category)) {
      const { status, message } = formatErrorResponse(
        "Category is required and must be one of the allowed categories.",
        null,
        httpStatus.BAD_REQUEST
      );
      res.status(status).json({ message });
      return;
    }

    const allowedBrands = brandsByCategory[req.body.category];
    if (allowedBrands.length === 0) {
      const { status, message } = formatErrorResponse(
        "Category is required and must be one of the allowed categories.",
        null,
        httpStatus.BAD_REQUEST
      );
      res.status(status).json({ message });
      return;
    }

    if (!req.body.brand || !allowedBrands.includes(req.body.brand)) {
      const { status, message } = formatErrorResponse(
        "Brand is required and must be one of the allowed brands.",
        null,
        httpStatus.BAD_REQUEST
      );
      res.status(status).json({ message });
      return;
    }

    const product = await Product({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      brand: req.body.brand,
      price: req.body.price,
    });

    const savedProduct = await product.save();

    const { status, result } = formatSuccessResponse(savedProduct);
    res.status(status).json(result);
  } catch (err) {
    console.error(err);
    const { status, message, error } = formatErrorResponse(
      "Products creation failed.",
      err
    );
    res.status(status).send({ message, error });
    return;
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id).lean();
    const { status, result } = formatSuccessResponse(product);
    res.status(status).json(result);
  } catch (err) {
    console.error(err);
    const { status, message, error } = formatErrorResponse(
      "Product deletion failed.",
      err
    );
    res.status(status).send({ message, error });
    return;
  }
};

module.exports = {
  getProducts,
  createProduct,
  deleteProduct,
};
