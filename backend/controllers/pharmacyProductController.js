import asyncHandler from 'express-async-handler'
import PharmacyProducts from '../models/b2cProductModel.js';

//@desc Fetch all pharmacyProducts
//@route GET /api/b2cproducts
//@access Public
const getPharmacyProducts = asyncHandler(async(req, res) => {
  const pageSize = 10
    
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword ? {
    name: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {}

  const count = await PharmacyProducts.countDocuments({... keyword})

  const pharmacyProducts = await PharmacyProducts.find({...keyword}).limit(pageSize).skip(pageSize * (page -1))
    
  res.json({page, pharmacyProducts, pages: Math.ceil(count/ pageSize)})
});

//@desc Create a pharmacyProduct
//@route POST /api/b2cproducts
//@access Private/
const createPharmacyProduct = asyncHandler(async(req, res) => {
    const pharmacyProduct = new PharmacyProducts ({
        name: 'Sample Name',
        description: 'Sample description',
        originalPrice: 0,
        offeredPrice: 0,
        pharmacy: req.pharmacy._id,
        category: 'Sample Category',
        company: 'Sample Company',
        uploadDate: "1st April, 2021",
        expiryDate: "2nd June, 2022",
        image: '/images/sample.jpg',
    })
    
    const createdPharmacyProduct = await pharmacyProduct.save();
    res.status(201).json(createdPharmacyProduct);
});

//@desc Update a pharmacyProduct
//@route PUT /api/b2cproducts/:id
//@access Public
const updatePharmacyProduct = asyncHandler(async(req, res) => {
  const { name, description, originalPrice, offeredPrice, category, company, uploadDate, expiryDate, image,
    isPrescriptionRequired  } 
       = req.body;

  const product = await PharmacyProducts.findById(req.params.id);

  if(product){
      product.name = name;
      product.description = description;
      product.originalPrice = originalPrice;
      product.offeredPrice = offeredPrice;
      product.category = category;
      product.company = company;
      product.uploadDate = uploadDate;
      product.expiryDate = expiryDate;
      product.image = image;
      product.isPrescriptionRequired  = isPrescriptionRequired;    

      const updatedProduct = await product.save();
      res.json(updatedProduct);
  } else {
      res.status(404);
      throw new Error('Product Not Found');
  }
});

//@desc Fetch single PharmacyProduct
//@route GET /api/b2cproducts/:id
//@access Public
const getPharmacyProductById = asyncHandler(async(req, res) => {
  const product = await PharmacyProducts.findById(req.params.id)

  if (product) {
      res.json(product)    
  } else {
      res.status(404)
      throw new Error('Product not found.')
  }
});

//@desc Delete a PharmacyProduct
//@route DELETE /api/b2cproducts/:id
//@access Private/Admin
const deletePharmacyProduct = asyncHandler(async(req, res) => {
  const product = await PharmacyProducts.findById(req.params.id)

  if (product) {
      await product.remove();
      res.json({message: 'Product Removed'});  
  } else {
      res.status(404)
      throw new Error('Product not found.')
  }
});

export { getPharmacyProducts,  createPharmacyProduct, updatePharmacyProduct, getPharmacyProductById,
         deletePharmacyProduct};