const express = require('express');

const router = express.Router();





const productController = require('../controllers/ProductsController');


router.get('/getAllProducts', productController.getAllProducts);
router.get('/getSingleProduct', productController.getSingleProduct);
router.post('/addProduct', productController.addProduct);

router.get('/deleteProduct/:id', productController.deleteProduct);



module.exports = router;