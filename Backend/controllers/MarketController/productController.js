const Product = require('../../models/MarketModel/productModel.js');
const APIFeatures = require("../../utils/MarketUtils/apiFeatures.js");

// Create new product
exports.newProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            product
        });
    } catch (error) {
        next(error);
    }
};

// Get single product by ID
exports.getSingleProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        next(error);
    }
};

// Update product by ID
exports.updateProducts = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        next(error);
    }
};

// Delete product by ID
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Product deleted"
        });
    } catch (error) {
        next(error);
    }
};

// Admin get all products
exports.getAdminProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        next(error);
    }
};

// Get products with filtering and searching
exports.getProducts = async (req, res, next) => {
    try {
        const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter();
        const products = await apiFeatures.query;
        const filteredProductsCount = products.length;

        res.status(200).json({
            success: true,
            count: filteredProductsCount,
            products
        });
    } catch (error) {
        next(error);
    }
};

// Supplier get all products for logged-in user
exports.getSupplierProducts = async (req, res, next) => {
    try {
        const products = await Product.find({ user: req.user.id });
        res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        next(error);
    }
};
