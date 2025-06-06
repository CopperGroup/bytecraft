import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true},
    images: [
        {
            type: String
        }
    ],
    isAvailable: {
        type: Boolean
    },
    quantity: {
        type: Number
    },
    url: {
        type: String
    },
    priceToShow: {
        type: Number
    },
    price: {
        type: Number
    },
    category: [
        {
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    vendor: {
        type: String
    },
    description: {
        type: String
    },
    articleNumber: {
        type: String
    },
    params: [
        {
            name: {
                type: String,
                required: true
            },
            value: {
                type: String,
                required: true
            },
        }
    ],
    isFetched: {
        type: Boolean
    },
    reviews: [
        {
            user: { type: String },
            rating: { type: Number },
            text: { type: String },
            attachmentsUrls: [{ type: String }],
            time: { type: String }
        }
    ],
    orderedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ],

    likedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

    addedToCart: [
        {
            type: Date
        }
    ]

}, { timestamps: true })

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;