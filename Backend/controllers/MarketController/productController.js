const Product = require('../../models/MarketModel/productModel.js');
const APIFeatures=require("../../utils/MarketUtils/apiFeatures.js");

//new prpduct
exports.newProduct=async(req,res,next)=>{
    let images = []
   let BASE_URL = process.env.BACKEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }    
    if(req.files.length > 0) {
        req.files.forEach( file => {
            let url = `${BASE_URL}/uploads/${file.originalname}`;
            images.push({ image: url })
        })
    }
    req.body.images = images;
    const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
}

//get single product
exports.getSingleProduct=async(req,res,next)=>{
    const product=await Product.findById(req.params.id)
    if(!product){
        return res.status(400).json({
            success:false,
            message:"Product not found"
        })
    }
    res.status(201).json({
        success:true,
        product
    })
}

//update product
exports.updateProducts=async(req,res,next)=>{
    let product=await Product.findById(req.params.id)
    
    let images = []
    if(req.body.imagesCleared === 'false' ) {
        images = product.images;
    }
    let BASE_URL = process.env.BACKEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }    
    if(req.files.length > 0) {
        req.files.forEach( file => {
            let url = `${BASE_URL}/uploads/${file.originalname}`;
            images.push({ image: url })
        })
    }

    req.body.images = images;
    if(!product){
        return res.status(404).json({
            success:false,
            message:"Product not found"
        })
    }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        success:true,
        product
    })
}

//delete product
exports.deleteProduct=async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }
    await Product.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.status(200).json({
            success:true,
            message:"Product Deleted"
        })
    })
}

//admin get all products
exports.getAdminProducts=async(req,res,next)=>{
    const products = await Product.find();
    res.status(200).send({
        success: true,
        products
    })
   
}

//filter & search product
exports.getProducts=async(req,res,next)=>{
   
    let buildQuery=()=>{
        return new APIFeatures(Product.find(),req.query).search().filter()
    }
    const products=await buildQuery().query
    
    let filteredProductsCount=products.length;

    res.status(200).json({
        success : true,
        count:filteredProductsCount,
        products
    })
}
// Get low stock products (stock < 10)
exports.getLowStockProducts = async (req, res, next) => {
    try {
        const lowStockProducts = await Product.find({ stock: { $lt: 10 } });

        res.status(200).json({
            success: true,
            lowStockProducts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
exports.getExpiringSoonProducts = async (req, res, next) => {
    try {
        const today = new Date();
        const twentyDaysFromNow = new Date();
        twentyDaysFromNow.setDate(today.getDate() + 20);

        // Find products expiring within the next 20 days
        const expiringProducts = await Product.find({
            expiry: {
                
                $lte: twentyDaysFromNow
            }
        });

        res.status(200).json({
            success: true,
            expiringProducts
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

// Get all products from category "Dairy"
exports.getCategoryProducts = async (req, res) => {
    const cat=req.params.cat
    console.log(cat)
    try {
        const categoryProducts = await Product.find({ category: cat });

        res.status(200).json({
            success: true,
            products: categoryProducts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};// Get random dairy products
exports.getRandomDairyProducts = async (req, res) => {
    try {
        const randomDairyProducts = await Product.aggregate([
            {
                $match: { category: "Dairy" }
            },
            {
                $sample: { size: 3} // Get 5 random products
            }
        ]);

        res.status(200).json({
            success: true,
            products: randomDairyProducts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
exports.getRandomRiceProducts = async (req, res) => {
    try {
        const randomRiceProducts = await Product.aggregate([
            {
                $match: { category: "Rice" }
            },
            {
                $sample: { size: 3} // Get 5 random products
            }
        ]);

        res.status(200).json({
            success: true,
            products: randomRiceProducts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

exports.getRandomFoodCupboardProducts = async (req, res) => {
    try {
        const randomFoodCupboardProducts = await Product.aggregate([
            {
                $match: { category: "Food Cupboard" }
            },
            {
                $sample: { size: 3} // Get 5 random products
            }
        ]);

        res.status(200).json({
            success: true,
            products: randomFoodCupboardProducts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
exports.getRandomHouseholdProducts = async (req, res) => {
    try {
        const randomHouseholdProducts = await Product.aggregate([
            {
                $match: { category: "Household" }
            },
            {
                $sample: { size: 3} // Get 5 random products
            }
        ]);

        res.status(200).json({
            success: true,
            products: randomHouseholdProducts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
exports.getRandomCookingEssentialsProducts = async (req, res) => {
    try {
        const randomCookingEssentialsProducts = await Product.aggregate([
            {
                $match: { category: "Cooking Essentials" }
            },
            {
                $sample: { size: 3} // Get 5 random products
            }
        ]);

        res.status(200).json({
            success: true,
            products: randomCookingEssentialsProducts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
exports.getRandomBakeryProducts = async (req, res) => {
    try {
        const randomBakeryProducts = await Product.aggregate([
            {
                $match: { category: "Bakery" }
            },
            {
                $sample: { size: 3} // Get 5 random products
            }
        ]);

        res.status(200).json({
            success: true,
            products: randomBakeryProducts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
exports.getRandomFrozenProducts = async (req, res) => {
    try {
        const randomFrozenProducts = await Product.aggregate([
            {
                $match: { category: "Frozen" }
            },
            {
                $sample: { size: 3} // Get 5 random products
            }
        ]);

        res.status(200).json({
            success: true,
            products: randomFrozenProducts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
exports.getRandomDryFishProducts = async (req, res) => {
    try {
        const randomDryFishProducts = await Product.aggregate([
            {
                $match: { category: "Dry Fish" }
            },
            {
                $sample: { size: 3} // Get 5 random products
            }
        ]);

        res.status(200).json({
            success: true,
            products: randomDryFishProducts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
exports.getRandomSnacksProducts = async (req, res) => {
    try {
        const randomSnacksProducts = await Product.aggregate([
            {
                $match: { category: "Snacks" }
            },
            {
                $sample: { size: 3} // Get 5 random products
            }
        ]);

        res.status(200).json({
            success: true,
            products: randomSnacksProducts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
exports.getRandomSeedsProducts = async (req, res) => {
    try {
        const randomSeedsProducts = await Product.aggregate([
            {
                $match: { category: "Seeds" }
            },
            {
                $sample: { size: 3} // Get 5 random products
            }
        ]);

        res.status(200).json({
            success: true,
            products: randomSeedsProducts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
exports.getRandomSeedsProducts = async (req, res) => {
    try {
        const randomSeedsProducts = await Product.aggregate([
            {
                $match: { category: "Seeds" }
            },
            {
                $sample: { size: 3} // Get 5 random products
            }
        ]);

        res.status(200).json({
            success: true,
            products: randomSeedsProducts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
exports.getRandomSpicesProducts = async (req, res) => {
    try {
        const randomSpicesProducts = await Product.aggregate([
            {
                $match: { category: "Spices" }
            },
            {
                $sample: { size: 3} // Get 5 random products
            }
        ]);

        res.status(200).json({
            success: true,
            products: randomSpicesProducts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
exports.getRandomHealthProducts = async (req, res) => {
    try {
        const randomHealthProducts = await Product.aggregate([
            {
                $match: { category: "Health & Beauty" }
            },
            {
                $sample: { size: 3} // Get 5 random products
            }
        ]);

        res.status(200).json({
            success: true,
            products: randomHealthProducts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
exports.getRandomOfferProducts = async (req, res) => {
    try {
        const randomOfferProducts = await Product.aggregate([
            {
                $match: { category: "Offer" }
            },
            {
                $sample: { size: 3} // Get 5 random products
            }
        ]);

        res.status(200).json({
            success: true,
            products: randomOfferProducts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};
exports.getRandomBeverageProducts = async (req, res) => {
    try {
        const randomBeverageProducts = await Product.aggregate([
            {
                $match: { category: "Beverages" }
            },
            {
                $sample: { size: 3} // Get 5 random products
            }
        ]);

        res.status(200).json({
            success: true,
            products: randomBeverageProducts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};



   

