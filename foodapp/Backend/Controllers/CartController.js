import CartModel from "../Models/CartModel";
import FoodModel from "../Models/FoodModel";
const stripe = require('stripe')("sk_test_51NuVY0SBwK9ePU2bSXSQunMDYUeW3lhOp3UgAveJiAa4GVskcOJu7AhndGoqRyxvZljQBHROUMzn42ZWU1OZHI7p009brYib54")
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const checkout = async (req, res) => {
  const { foods } = req.body;
  console.log(foods);

  if (!stripe) {
    console.error("Stripe is not properly initialized.");
    res.status(500).send("Stripe initialization error");
    return;
  }

  const lineItems = foods.map((food) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: food.name,
        // images: [food.thumbnail],
      },
      unit_amount: food.price * 100,
    },
    quantity: food.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).send("Error creating Stripe session");
  }
};


export const Getcartitems = async (req, res) => {
  try {
    const userid = req.params.user_id;
    const Cartdata = await CartModel.find({ userid: userid });
    if (Cartdata) {
      return res.status(200).json({
        data: Cartdata,
        message: "Cart Items",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const AddtoCart = async (req, res) => {
  try {
    const { userid, foodid } = req.body;
    const FoodData = await FoodModel.findOne({ _id: foodid });
    if (!FoodData) {
      return res.status(404).json({
        message: 'Food not found',
      });
    }
    const existCartItem = await CartModel.findOne({
      foodid: foodid,
      userid: userid,
    });
    if (existCartItem) {
      let quantity = existCartItem.quantity + 1;
      const updatedItem = await CartModel.updateOne(
        { _id: existCartItem._id },
        {
          $set: {
            quantity: quantity,
          },
        }
      );
      if (updatedItem.acknowledged) {
        return res.status(200).json({
          data: updatedItem,
          message: "updated",
        });
      }
    }
    const CartData = new CartModel({
      userid: userid,
      foodid: foodid,
      name: FoodData.name,
      price: FoodData.price,
      quantity: 1,
      thumbnail: FoodData.thumbnail,
    });
    CartData.save();
    if (CartData) {
      return res.status(201).json({
        data: CartData,
        message: "Successfully added",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Updatequantity = async (req, res) => {
  try {
    const cartid = req.params.cart_id;
    const { updatetype , foodid} = req.body;
    const Cartdata = await CartModel.findOne({ _id: cartid });
    if (!Cartdata) {
      return res.status(404).json({
        message: 'Cart not found',
      });
    }
    const FoodData = await FoodModel.findOne({ _id: foodid });
    if (!FoodData) {
      return res.status(404).json({
        message: 'Food not found',
      });
    }
    let quantity = Cartdata.quantity;
    let price = FoodData.price;
    if (updatetype === "increment") {
      quantity += 1;
      price = price * quantity;
    }
    if (updatetype === "decrement" && quantity > 1) {
      quantity -= 1;
      price = price * quantity;
    }
    const Updatedquantity = await CartModel.updateOne(
      { _id: cartid },
      {
        $set: {
          quantity: quantity,
          price: price,
        },
      }
    );
    if (Updatedquantity.acknowledged) {
      return res.status(200).json({
        message: "Updated",
      });
    }
    console.log(Updatedquantity);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Deletequantity = async (req, res) => {
  try {
    const cartid = req.params.cart_id;
    const Cartdata = await CartModel.findOne({ _id: cartid });
    if (Cartdata.quantity <= 0) {
      const Deletequantity = await CartModel.deleteOne({ _id: cartid });
      if (Deletequantity.acknowledged) {
        return res.status(200).json({
          data: Deletequantity,
          message: "Quantity Deleted",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Removecartitem = async (req, res) => {
  try {
    const cartid = req.params.cart_id;
    const Deleteitem = await CartModel.deleteOne({ _id: cartid });
    if (Deleteitem.acknowledged) {
      return res.status(200).json({
        message: "Cart item deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
