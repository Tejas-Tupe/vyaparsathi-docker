import Product from '../Config/Database/Models/Productmodel.js';
import Order from '../Config/Database/Models/Ordermodel.js';
import ExcelJS from 'exceljs';

export const exportOrdersToExcel = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user }).lean();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Orders');

    worksheet.columns = [
      { header: 'Order ID', key: '_id', width: 30 },
      { header: 'Product Name', key: 'productName', width: 25 },
      { header: 'Quantity', key: 'quantity', width: 10 },
      { header: 'Total (₹)', key: 'total', width: 15 },
      { header: 'Status', key: 'status', width: 15 },
      { header: 'Created At', key: 'createdAt', width: 20 },
    ];

    orders.forEach((order) => {
      worksheet.addRow({
        _id: order._id.toString(),
        productName: order.productName || 'N/A',
        quantity: order.quantity,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt,
      });
    });

    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', `attachment; filename="orders_${Date.now()}.xlsx"`);

    await workbook.xlsx.write(res); // stream
    res.end(); // CLOSE
  } catch (error) {
    console.error(error);
    res.status(500).send('Error exporting Excel');
  }
};

export const createOrder = async (req, res) => {
  try {
    const userId = req.user;
    const { productId, productName, quantity, price, total } = req.body;

    if (!productId || !quantity || !price || !total) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Fetch product from DB
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    // Check stock availability
    if (product.quantity < quantity) {
      return res.status(400).json({ error: 'Out of Stock' });
    }

    // Deduct stock
    product.quantity -= quantity;
    product.updatedAt = new Date();
    await product.save();

    // Create Order
    const order = await Order.create({
      productId,
      productName,
      quantity,
      price,
      total,
      user: userId,
      createdAt: new Date(),
    });

    res.status(201).json({ message: 'Order placed successfully.', order });
  } catch (err) {
    console.error('Order create error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getOrdersByUser = async (req, res) => {
  // Updated Controller for orders
  try {
    const userId = req.user; // from middleware
    const orders = await Order.find({ user: userId })
      .populate('productId', 'name price')
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(orders);
  } catch (_err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// DELETE all orders of a user
export const deleteAllOrdersByUser = async (req, res) => {
  try {
    const userId = req.user; // coming from JWT middleware

    const result = await Order.deleteMany({ user: userId });

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} orders deleted successfully.`,
    });
  } catch (error) {
    console.error('Error deleting user orders:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete orders.',
      error,
    });
  }
};
