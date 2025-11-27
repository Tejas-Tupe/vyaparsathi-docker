import express from "express";
import AuthRoutes from './AuthRoutes.js';
import UserRoutes from './UserRoutes.js';
import ProductRoutes from './ProductRoutes.js';
import OrdersRoutes from './OrdersRoutes.js'
import StockRoutes from './StockRoutes.js';
import HealthRoutes from './HealthRoutes.js';

let router = express.Router();

router.use('/auth',AuthRoutes); // signup login changepass deleteac editprofile
router.use('/users',UserRoutes); // userdetails
router.use('/products',ProductRoutes); // getMyProducts getProductOverview getOverviewStats
router.use('/orders',OrdersRoutes); // getordersbyuser, create detailed orders
router.use('/stocks',StockRoutes); // add stocks, refil stocks
router.use('/health',HealthRoutes); // heath

export default router;