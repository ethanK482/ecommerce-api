import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import AsyncHandler from "express-async-handler";
import Order from "../model/Order.js";
import User from "../model/User.js";
import Product from "../model/Product.js";
import Coupon from "../model/Coupon.js";
import envGetter from "../../common/env/envGetter.js";
import UserService from "../services/UserService.js";
import CouponService from "../services/CouponService.js";
import { mapStripeOrder } from "../../common/helpers/mapStripeOrder.js";
import OrderService from "../services/OrderService.js";
import HttpStatusCode from "../../common/HttpStatusCode.js";

class OrderController{
  stripe = new Stripe(envGetter.getPaymentSecretKey());
  createOrder = AsyncHandler(async (req, res) => {
    // get order payload
    const { orderItems, shippingAddress, totalPrice } = req.body;
    const user = await UserService.findOneUserById(req.userAuthId);
    if (!user.hasShippingAddress)
      throw new Error("Please update your shipping address");
    if (orderItems?.length <= 0) {
      throw new Error("No order items found");
    }
    let discount = 1;
    if (req?.query?.code) {
      const coupon = await CouponService.findOneCouponByCode(req.query.code.toUpperCase())
      if (!coupon){
        throw new Error("coupon invalid");
      }
      if (coupon.isExpire){
       throw new Error("coupon expired");
      }
      discount = coupon.discount / 100;
    }
    //update quantity
    orderItems.forEach(async (orderItem) => {
      const product = await Product.findOne({ _id: { $in: orderItem } });
      product.totalSold += orderItem.totalQtyBuying;
      await product.save();
    });
    //create order
    const order = new Order({
      user: user.id,
      orderItems,
      shippingAddress,
      totalPrice: totalPrice * discount,
    });
    user.orders.push(order);
    await order.save();
    await user.save();
    const orderItemStripe = mapStripeOrder(orderItems);
    // make payment
    const session = await stripe.checkout.sessions.create({
      line_items: orderItemStripe,
      metadata: {
        order_id: JSON.stringify(order.id),
      },
      mode: "payment",
      success_url: "https://localhost:3000/success",
      cancel_url: "https://localhost:3000/cancel",
    });
    return res.send({
      url: session.url,
    });
  });
  getAllOrders = AsyncHandler(async (req, res) => {
    const order = await OrderService.findAllOrders();
   return res.status(HttpStatusCode.OK).json({
      status: "success",
      order,
      msg: " Order fetched successfully",
    });
  });
  getOneOrder = AsyncHandler(async (req, res) => {
    const order = await OrderService.findOrderById(req.params.id);
    if (!order) throw new Error("Order not found");
   return res.status(HttpStatusCode.OK).json({
      status: "success",
      order,
      msg: "Order fetched successfully",
    });
  });

  updateOrder = AsyncHandler(async (req, res) => {
    const order = await OrderService.updateOrder( req.params.id,req.body.status )
    return res.status(HttpStatusCode.OK).json({
      status: "success",
      order,
      msg: "Order updated successfully",
    });
  });

  getSaleStatistic = AsyncHandler(async (req, res) => {
    const orderSum = await OrderService.getSaleStatistic();
    const date = new Date();
    const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todaySale = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: today },
        },
      },
      {
        $group: {
          _id: null,
          todaySales: { $sum: "$totalPrice" },
        },
      },
    ]);
   return res.status(HttpStatusCode.OK).json({
      status: "success",
      orderSum,
      todaySale,
      msg: "get sales sum successfully",
    });
  });
}
export default new OrderController();