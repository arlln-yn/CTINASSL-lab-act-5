import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    series: {
        type: String,
        enum: ['Series 1', 'Series 2', 'Series 3'],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;  // Remove version key
            delete ret.createdAt; // Remove createdAt timestamp
            delete ret.updatedAt; // Remove updatedAt timestamp
        }
    }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
