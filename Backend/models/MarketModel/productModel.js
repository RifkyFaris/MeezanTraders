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
    expiry: {
        type: Date,
        required: true,
        default: 0.0
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
                'Rice',
                
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