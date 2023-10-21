import OrderModel from "../Models/OrderModel";
import CartModel from "../Models/CartModel";
import jwt from "jsonwebtoken";

export const AddOrder = async (req, res) => {
  try {
    const { userId, cartId } = req.body;
    const Cartdata = await CartModel.find({ _id: cartId });
    const Orderdata = new OrderModel({
      userId: userId,
      cartId: cartId,
      foodId: Cartdata.foodId,
      name: Cartdata.name,
      location: location,
      price: Cartdata.price,
      quantity: Cartdata.quantity,
      paymentmethod: paymentmethod,
      thumbnail: Cartdata.thumbnail,
    });
    Orderdata.save();
    const Token = await jwt.sign(
      {
        ID: orderId._id,
      },
      "SecretKey",
      { expiresIn: "1d" }
    );
    if (Orderdata) {
      return res.status(201).json({
        data: Orderdata,
        token: Token,
        message: "Order Successfully added",
        bill: Cartdata.quantity * Cartdata.price,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Getorderitems = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const Orderdata = await OrderModel.findOne({ _id: userId });
    if (Orderdata) {
      return res.status(200).json({
        data: Orderdata,
        message: "Order Items",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Deleteorder = async (req, res) => {
  try {
    const orderId = req.params.order_id;
    const Cancelorder = await OrderModel.deleteOne({ _id: orderId });
    if (Cancelorder.acknowledged) {
      return res.status(200).json({
        message: "Order Cancelled",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
