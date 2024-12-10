const Order = require("./order.model");
const logger = require("../../logger"); // Import the logger

const createAOrder = async (req, res) => {
  try {
    const newOrder = await Order(req.body);
    const savedOrder = await newOrder.save();
    logger.info("Order created successfully");
    res.status(200).json(savedOrder);
  } catch (error) {
    console.error("Error creating order", error);
    logger.error("Error creating order");
    res.status(500).json({ message: "Failed to create order" });
  }
};

const getOrderByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    if (!orders) {
      logger.error("order not found");
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders", error);
    logger.error("Error fetching orders");
    res.status(500).json({ message: "Failed to fetch order" });
  }
}

module.exports = {
  createAOrder,
  getOrderByEmail
};
