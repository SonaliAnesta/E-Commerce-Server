const express = require("express");

const {
  getProducts,
  createProduct,
  deleteProduct,
} = require("../services/productService");
const { authenticateForRole } = require("../middlewares/auth");
const { userRoles } = require("../utils/constants");

const productRouter = express.Router();

productRouter.get("/", getProducts);

productRouter.post(
  "/",
  (req, res, next) => authenticateForRole(req, res, next, [userRoles.ADMIN]),
  createProduct
);

productRouter.delete(
  "/:id",
  (req, res, next) => authenticateForRole(req, res, next, [userRoles.ADMIN]),
  deleteProduct
);

module.exports = productRouter;
