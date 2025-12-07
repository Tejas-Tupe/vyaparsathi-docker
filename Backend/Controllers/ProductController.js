import Product from '../Config/Database/Models/Productmodel.js';
import Order from '../Config/Database/Models/Ordermodel.js';
import mongoose from 'mongoose';

export const getMyProducts = async (req, res) => {
  try {
    const userId = req.user;
    const products = await Product.find({ user: userId });
    res.status(200).json({ products });
  } catch (err) {
    console.error('Fetch products error:', err);
    res.status(500).json({ error: 'Server error while fetching products.' });
  }
};

export const getProductOverview = async (req, res) => {
  // old routes getfilteredproducts and getproductstatsreplaced with this new
  try {
    const userId = req.user;

    const products = await Product.find({ user: userId });

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const soldData = await Order.aggregate([
          {
            $match: {
              user: new mongoose.Types.ObjectId(userId),
              productId: new mongoose.Types.ObjectId(product._id),
            },
          },
          {
            $group: {
              _id: null,
              totalSold: { $sum: '$quantity' },
              totalRevenue: { $sum: '$total' },
            },
          },
        ]);

        return {
          _id: product._id,
          name: product.name,
          category: product.category,
          price: product.price,
          quantityRemaining: product.quantity,
          lowStockThreshold: product.lowStockThreshold,
          totalSold: soldData[0]?.totalSold || 0,
          totalRevenue: soldData[0]?.totalRevenue || 0,
        };
      })
    );

    res.status(200).json({ products: productsWithStats });
  } catch (err) {
    console.error('Product overview fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch product overview' });
  }
};

// ------------------- New Controller: Overview Stats -------------------

export const getOverviewStats = async (req, res) => {
  try {
    const userId = req.user;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Today's Orders
    const todaysOrders = await Order.find({
      user: userId,
      createdAt: { $gte: today, $lt: tomorrow },
    });

    const totalOrdersToday = todaysOrders.length;

    // Today's Revenue
    const totalRevenueToday = todaysOrders.reduce((acc, order) => acc + order.total, 0);

    // Active Products
    const totalProducts = await Product.countDocuments({ user: userId });

    // Low Stock Products
    const lowStockCount = await Product.countDocuments({
      user: userId,
      $expr: { $lte: ['$quantity', '$lowStockThreshold'] },
    });

    //  Month-over-Month Growth
    const currentMonth = new Date().getMonth();
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;

    const [currentMonthRevenue] = await Order.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(String(userId)),
          $expr: { $eq: [{ $month: '$createdAt' }, currentMonth + 1] },
        },
      },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);

    const [prevMonthRevenue] = await Order.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(String(userId)),
          $expr: { $eq: [{ $month: '$createdAt' }, prevMonth + 1] },
        },
      },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);

    const momGrowth =
      prevMonthRevenue && prevMonthRevenue.total > 0
        ? (((currentMonthRevenue?.total || 0) - prevMonthRevenue.total) / prevMonthRevenue.total) *
          100
        : 0;

    const emptyStockCount = await Product.countDocuments({
      user: userId,
      quantity: 0,
    });
    // Empty Stocks

    // Count distinct product categories for this user
    const categories = await Product.distinct('category', { user: userId });
    const categoryCount = categories.length;

    return res.status(200).json({
      success: true,
      summary: {
        ordersToday: totalOrdersToday,
        revenueToday: totalRevenueToday,
        activeProducts: totalProducts,
      },
      quickStats: {
        ordersToday: totalOrdersToday,
        revenueToday: totalRevenueToday,
        lowStockCount: lowStockCount,
        emptyStockCount: emptyStockCount,
        momGrowth: momGrowth.toFixed(2),
        categories: categoryCount,
      },
    });
  } catch (error) {
    console.error('Error fetching overview stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load overview stats',
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const userId = req.user;
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required.' });
    }

    // Check if product belongs to user
    const product = await Product.findOne({ _id: productId, user: userId });

    if (!product) {
      return res.status(404).json({ error: 'Product not found or unauthorized.' });
    }

    await product.deleteOne();

    return res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (err) {
    console.error('Delete product error:', err);
    return res.status(500).json({ error: 'Failed to delete product.' });
  }
};
