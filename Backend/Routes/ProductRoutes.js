import express from 'express';
import {
  getMyProducts,
  getProductOverview,
  getOverviewStats,
  deleteProduct,
} from '../Controllers/ProductController.js';
import protect from '../Middlewares/Authentication.js';

const router = express.Router();

// Get user specific products
router.get('/', protect, getMyProducts);

// Product Overview API (for dashbaord product section)
router.get('/productsoverview', protect, getProductOverview);

// Overview API (for dashboard)
router.get('/overview', protect, getOverviewStats);

// Delete product API via product's ID
router.delete('/delete/:id', protect, deleteProduct);

export default router;
