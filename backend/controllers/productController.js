import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js';

//@desc Fetch all products
//@route GET /api/products
//@access Public
const getProducts = asyncHandler(async(req, res) => {
  const pageSize = 10
    
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {}

  const count = await Product.countDocuments({... keyword})

  const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1))
    
  res.json({page, products, pages: Math.ceil(count/ pageSize)})
});

//@desc Fetch single Product
//@route GET /api/products/:id
//@access Public
const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)    
    } else {
        res.status(404)
        throw new Error('Product not found.')
    }
});

//@desc Delete a Product
//@route DELETE /api/products/:id
//@access Private/Admin
const deleteProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove();
        res.json({message: 'Product Removed'});  
    } else {
        res.status(404)
        throw new Error('Product not found.')
    }
});

//@desc Create a product
//@route POST /api/products
//@access Private/Admin
const createProduct = asyncHandler(async(req, res) => {
  console.log(req.user)
    const product = new Product ({
        seller: req.user._id,
        sellerName: req.user.name,
        sellerEmail: req.user.email,
        name: 'Sample Name',
        description: 'Sample description',
        originalPrice: 0,
        offeredPrice: 0,
        location: "Sample Location",
        image: '/images/noImage.png',
        category: 'Sample Category',
        company: 'Sample Company',
        mfgDate: "1st April, 2021",
        expiryDate: "1st April, 2025",
        uploadDate: "1st April, 2021",
        countInStock: 0,        
        
        
    })
    
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

//@desc Update a product
//@route PUT /api/products/:id
//@access Public
const updateProduct = asyncHandler(async(req, res) => {
    const { name, description, originalPrice, offeredPrice, location, image, category, company, mfgDate,
            expiryDate, uploadDate, countInStock, isPrescriptionRequired, prescriptionImage } = req.body;

    const product = await Product.findById(req.params.id);

    if(product){
        product.name = name;
        product.description = description;
        product.originalPrice = originalPrice;
        product.offeredPrice = offeredPrice;
        product.location = location;        
        product.image = image;
        product.category = category;
        product.company = company;
        product.mfgDate = mfgDate;
        product.expiryDate = expiryDate;
        product.uploadDate = uploadDate;
        product.countInStock = countInStock;
        product.isPrescriptionRequired = isPrescriptionRequired;
        product.prescriptionImage = prescriptionImage;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product Not Found');
    }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
  
    const product = await Product.findById(req.params.id)
  
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      )
  
      if (alreadyReviewed) {
        res.status(400)
        throw new Error('Product already reviewed')
      }
  
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      }
  
      product.reviews.push(review)
  
      product.numReviews = product.reviews.length
  
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length
  
      await product.save()
      res.status(201).json({ message: 'Review added' })
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  public
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  
    res.json(products)
  })

  //@desc Update order to verified
//@route GET /api/products/:id/verified
//@access Public
const verifiedProduct = asyncHandler(async (req, res,) => {
  const product = await Product.findById(req.params.id)
  console.log(req.doctor)

  if(product) {
      product.isVerified = true
      product.verifiedAt = Date.now()
      product.verifierId = req.doctor._id
      product.verifierName = req.doctor.doctorName
      product.verifierEmail = req.doctor.email

      const updatedProduct = await product.save()

      res.json(updatedProduct)
  } else {
      res.status(404)
      throw new Error('Product not found');
  }
})

  //@desc Update order to verified
//@route GET /api/products/:id/verified
//@access Public
const notVerifiedProduct = asyncHandler(async (req, res,) => {
  const product = await Product.findById(req.params.id)

  if(product) {
      product.isVerified = false
      product.verifiedAt = Date.now()
      product.verifierId = req.doctor._id
      product.verifierName = req.doctor.doctorName
      product.verifierEmail = req.doctor.email

      const updatedProduct = await product.save()

      res.json(updatedProduct)
  } else {
      res.status(404)
      throw new Error('Product not found')
  }
})

//@desc Update Buyer Prescription
//@route PUT /api/products/:id
//@access Public
const updateBuyerPrescription = asyncHandler(async(req, res) => {
  const { buyerPrescriptionImage } = req.body;

  const product = await Product.findById(req.params.id);

  if(product){
      product.buyerPrescriptionImage = buyerPrescriptionImage;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
  } else {
      res.status(404);
      throw new Error('Product Not Found');
  }
});

export {
    getProducts,  getProductById, deleteProduct, createProduct, updateProduct, createProductReview, getTopProducts,
    verifiedProduct, notVerifiedProduct, updateBuyerPrescription
};