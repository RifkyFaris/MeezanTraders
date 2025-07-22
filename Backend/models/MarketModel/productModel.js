const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Please enter product name"],
    },
    price: {
        type: Number,
        required: true,
        default: 0.0
    },
    discount: {
        type: Number,
        required: true,
        default: 0.0
    },
    cost: {
        type: Number,
        default: 0.0
    },
    expiry: {
        type: Date,
        required: true,
        default: 0.0
    },
    barcode:{
        type: String,
    },
    images: [
        {
            image: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: true,
        enum: {
            values: [
                'Dairy',
                'Beverages',
                'Rice',
                'Food Cupboard',
                'Household',
                'Cooking Essentials',
                'Bakery',
                'Frozen',
                'Dry Fish',
                'Snacks',
                'Seeds',
                'Spices',
                'Health & Beauty',
                'Private',
                'Offer'
                
            ],
            message : "Please select correct category"
        },
        
    },
    stock: {
        type: Number,
        required: true,
    },
    user: {
        type : mongoose.Schema.Types.ObjectId
    }
    ,
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

let schema = mongoose.model('Product', productSchema)

module.exports = schema