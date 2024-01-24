import Coupon from "../model/Coupon.js";
import AsyncHandler from "express-async-handler";
import CouponService from "../services/CouponService.js";
import HttpStatusCode from "../../common/HttpStatusCode.js";
class CouponController {
  createCoupon = AsyncHandler(async (req, res) => {
    const { code, startDate, endDate, discount } = req.body;
    const couponExists = await CouponService.findOneCoupon(code);
    if (couponExists) {
      throw new Error("Coupon already exists");
    }
    if (isNaN(discount)) throw new Error("Discount value must be a number");
    try {
      const coupon = await CouponService.createCoupon(
        code.toUpperCase(),
        startDate,
        endDate,
        req.userAuthId,
        discount
      );
      return res.status(HttpStatusCode.CREATED).json({
        status: "success",
        coupon: coupon,
        msg: "Coupon created successful",
      });
    } catch (error) {
      throw error;
    }
  });

  getAllCoupons = AsyncHandler(async (req, res) => {
    try {
      const coupons = await CouponService.findAllCoupon();
      return res.status(HttpStatusCode.OK).json({
        status: "success",
        coupons,
        msg: "Coupon fetched successful",
      });
    } catch (error) {
      throw error;
    }
  });

  getCoupon = AsyncHandler(async (req, res) => {
    const coupon = await CouponService.findCouponById(req.params.id);
    if (!coupon) {
      throw new Error("Coupon not found");
    }
    return res.status(HttpStatusCode.OK).json({
      status: "success",
      coupon,
      msg: "Coupon fetched successful",
    });
  });

  updateCoupon = AsyncHandler(async (req, res) => {
    try {
      const { code, startDate, endDate, discount } = req.body;
      const coupon = await CouponService.updateCoupon(
        req.params.id,
        code?.toUpperCase(),
        startDate,
        endDate,
        discount
      );

      if (!coupon) {
        throw new Error("Coupon not found");
      }
      return res.status(HttpStatusCode.OK).json({
        status: "success",
        coupon,
        msg: "Coupon updated successful",
      });
    } catch (error) {
      throw error;
    }
  });

  deleteCoupon = AsyncHandler(async (req, res) => {
    try {
      await CouponService.deleteCoupon(req.params.id);
      return res.status(HttpStatusCode.OK).json({
        status: "success",
        msg: "Coupon deleted",
      });
    } catch (error) {
      throw error;
    }
  });
}
export default new CouponController();
