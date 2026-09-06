import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

const formatCartResponse = (cart) => {
  const items = cart?.items || [];

  const totalPrice = items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  return {
    items,
    totalPrice,
  };
};

export const addToCart = async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }

    let cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        product: productId,
        quantity: 1,
      });
    }

    await cart.save();

    await cart.populate("items.product");

    res.status(200).json(
      formatCartResponse(cart)
    );
  } catch (error) {
    console.log(
      "Error in addToCart:",
      error.message
    );

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const removeProductFromCart = async (
  req,
  res
) => {
  try {
    const productId = req.params.productId;

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) =>
        item.product.toString() !== productId
    );

    await cart.save();

    await cart.populate("items.product");

    res.status(200).json(
      formatCartResponse(cart)
    );
  } catch (error) {
    console.log(
      "Error in removeFromCart:",
      error.message
    );

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const decreaseCartItem = async (
  req,
  res
) => {
  try {
    const productId = req.params.productId;

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) =>
        item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        message: "Item not found in cart",
      });
    }

    cart.items[itemIndex].quantity -= 1;

    if (cart.items[itemIndex].quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();

    await cart.populate("items.product");

    res.status(200).json(
      formatCartResponse(cart)
    );
  } catch (error) {
    console.log(
      "Error in decreaseCartItem:",
      error.message
    );

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");

    if (!cart) {
      return res.status(200).json({
        items: [],
        totalPrice: 0,
      });
    }

    res.status(200).json(
      formatCartResponse(cart)
    );
  } catch (error) {
    console.log(
      "Error in getCart:",
      error.message
    );

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.items = [];

    await cart.save();

    res.status(200).json({
      items: [],
      totalPrice: 0,
    });
  } catch (error) {
    console.log(
      "Error in clearCart:",
      error.message
    );

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};