import Product from '../Config/Database/Models/Productmodel.js';

export const refillStock = async (req, res) => {
  try {
    const userId = req.user;
    const { productId, quantity, price } = req.body;

    // Basic validation
    if (!productId || quantity < 1 || price < 1) {
      return res.status(400).json({ error: 'Invalid input data.' });
    }

    // Find product that belongs to the user
    const product = await Product.findOne({ _id: productId, user: userId });

    if (!product) {
      return res.status(404).json({ error: 'Product not found or unauthorized.' });
    }

    // Update fields
    product.quantity += quantity;
    product.price = price; // Overwrite latest price
    product.updatedAt = new Date();

    await product.save(); // Saving data into database

    res.status(200).json({ message: 'Stock refilled successfully', product });
  } catch (err) {
    console.error('Refill stock error:', err);
    res.status(500).json({ error: 'Failed to refill stock.' });
  }
};

export const addStock = async (req, res) => {
  try {
    const userId = req.user; // comes from protect middleware
    const { name, category, quantity, price, lowStockThreshold } = req.body;

    // Basic validation
    if (!name || !category || quantity < 0 || price < 0) {
      return res.status(400).json({ error: 'Invalid product data.' });
    }

    const newProduct = await Product.create({
      name,
      category,
      quantity,
      price,
      lowStockThreshold,
      user: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({
      message: 'Stock added successfully',
      product: newProduct,
    });
  } catch (err) {
    console.error('Error adding stock:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
