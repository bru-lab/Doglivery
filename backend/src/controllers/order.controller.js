import Order from '../models/order.model.js';
import Cart from '../models/cart.model.js';

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "fullName email")
      .populate("items.product", "name price image")
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error getting all orders:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { deliveryAddress, paymentMethod } = req.body;

    // find user cart
    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");

    // Check if cart exists
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    // Create order items
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,

      name: item.product.name,

      price: item.product.price,

      quantity: item.quantity,
    }));

    // Calculate total price
    const deliveryFee = 5;

    const subtotal = orderItems.reduce(
      (accumulator, item) =>
        accumulator +
        item.price * item.quantity,
      0
    );

    const totalPrice = subtotal + deliveryFee;

    // Create new order
    const newOrder = new Order({
      user: req.user._id,

      items: orderItems,

      totalPrice,

      deliveryAddress,

      paymentMethod,
    });

    // Save order
    await newOrder.save();

    // Clear cart after checkout
    cart.items = [];

    await cart.save();


    res.status(201).json(newOrder);
  } catch (error) {
    console.log("Error in createOrder controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getMyOrders = async (req, res) => {
  try {
    const myOrders = await Order.find({
      user: req.user._id,
    }).populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json(myOrders);
  } catch (error) {
    console.log("Error in getMyOrders controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "fullName email")
      .populate("items.product", "name price image");

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    return res.status(200).json(order);

  } catch (error) {
    console.error("Error getting order:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateOrderStatus = async (
  req,
  res
) => {
  try {

    const { orderStatus } = req.body;

    const allowedStatuses = [
      "pending",
      "preparing",
      "on-the-way",
      "delivered",
      "cancelled",
    ];

    const validTransitions = {
      pending: [
        "preparing",
        "cancelled",
      ],

      preparing: [
        "on-the-way",
        "cancelled",
      ],

      "on-the-way": [
        "delivered",
      ],

      delivered: [],

      cancelled: [],
    };

    // Validate status
    if (
      !allowedStatuses.includes(orderStatus)
    ) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        message: "No order found",
      });
    }

    // Prevent same update
    if (
      order.orderStatus === orderStatus
    ) {
      return res.status(400).json({
        message:
          "Order already has this status",
      });
    }

    const allowedNextStatuses =
      validTransitions[
      order.orderStatus
      ];

    // Validate transition
    if (
      !allowedNextStatuses.includes(
        orderStatus
      )
    ) {
      return res.status(400).json({
        message:
          `Cannot change status from ${order.orderStatus} to ${orderStatus}`,
      });
    }

    order.orderStatus = orderStatus;

    // Save delivery timestamp
    if (orderStatus === "delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save();

    res.status(200).json(order);

  } catch (error) {

    console.log(
      "Error in updateOrderStatus controller:",
      error
    );

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

