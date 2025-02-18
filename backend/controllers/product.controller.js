import Product from '../models/product.model.js'; 
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error in fetching products: ", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
}

export const getSeries1 = async (req, res) => {
    try {
        // Fetch products that belong to "Series 1"
        const series1Products = await Product.find({ series: "Series 1" });
        res.status(200).json({ success: true, data: series1Products });
    } catch (error) {
        console.log("Error in fetching Series 1 products: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getSeries2 = async (req, res) => {
    try {
        // Fetch products that belong to "Series 2"
        const series2Products = await Product.find({ series: "Series 2" });
        res.status(200).json({ success: true, data: series2Products });
    } catch (error) {
        console.log("Error in fetching Series 2 products: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getSeries3 = async (req, res) => {
    try {
        // Fetch products that belong to "Series 2"
        const series3Products = await Product.find({ series: "Series 3" });
        res.status(200).json({ success: true, data: series3Products });
    } catch (error) {
        console.log("Error in fetching Series 3 products: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const createProduct = async (req, res) => {
    const product = req.body; // user will send data

    if (!product.name || !product.price || !product.image || !product.series || !product.description) {
        return res.status(400).json({ success: false, message: "Please provide all fields." });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in Create Product: ", error); // log error details
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};


export const updateProduct = async (req, res) => {
    const { id } = req.params;

    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product ID."});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true});
        res.status(200).json({ success: true, data: updatedProduct});
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error."});
    }
}


export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product ID."});
    }
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product Deleted."});
    } catch (error) {
        console.log("Error in deleting product: ", error.message);
        res.status(500).json({ success: false, message: "Server Error."});
    }
}
    
// new added line 66 for dashboard

export const getSalesData = async (req, res) => {
    try {
        const salesData = await Product.aggregate([

            {
                $group: {
                    _id: "$dateSold",
                    total: { $sum: "$amount" },
                }
            }
        ]);

        const seriesData = await Product.aggregate([
            {
                $group: {
                    _id: "$series",
                    count: { $sum: 1 }
                }
            }
        ]);

        const formattedSalesData = salesData.map(item => ({
            date: item._id,
            total: item.total
        }));

        const formattedSeriesData = {
            series1: seriesData.find(item => item._id === 'series 1')?.count || 0,
            series2: seriesData.find(item => item._id === 'series 2')?.count || 0,
            series3: seriesData.find(item => item._id === 'series 3')?.count || 0,
        };

        res.json({ salesData: formattedSalesData, seriesData: formattedSeriesData });
    } catch (error) {
        console.error('Failed to fetch sales data:', error);
        res.status(500).send('Failed to fetch sales data');
    }
};