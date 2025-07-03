
import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";

// Get All Products
export const getAllProducts = async (req, res, next) => {
  try {


    res.status(200).json({
      success: true,
      Product,
    });
  } catch (error) {
    next(error); // Passes error to the centralized error handler
  }
};

// Get All Products ---Product Sliders
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};

// Get Product Details
export const getProductDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

// Create Product
export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};
