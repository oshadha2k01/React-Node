const Product = require('../models/Product');

// Create Product
exports.createProduct = async (req, res) => {
    try {
        const { name, price, quantity } = req.body;
        const newProduct = new Product({ name, price, quantity });
        const savedProduct = await newProduct.save();
        res.status(201).json({ message: 'Product Add successfully', ...savedProduct._doc });
    } catch (error) {
        res.status(500).json({ error: 'Error creating product' });
    }
};

// Get All Products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        console.log('Sending products:', products.length, 'items');
        res.json(products); // Send products array directly
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Error fetching products' });
    }
};

// Get One Product
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        res.json({ message: 'Product fetched successfully', ...product._doc });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product' });
    }
};

// Update Product
exports.updateProduct = async (req, res) => {
    try {
        const { name, price, quantity } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, quantity },
            { new: true }
        );

        if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });

        res.json({ message: 'Product Update successfully', ...updatedProduct._doc });
    } catch (error) {
        res.status(500).json({ error: 'Error updating product' });
    }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });

        res.json({ message: 'Product Delete successfully', ...deletedProduct._doc });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting product' });
    }
};
