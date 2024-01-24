import Coupon from "../model/Coupon.js";

class CouponService {
  async findOneCoupon(code) {
    return await Coupon.findOne({ code });
  }

  async createCoupon(code, startDate, endDate, user, discount) {
    return await Coupon.create({
      code,
      startDate,
      endDate,
      user,
      discount,
    });
  }

  async findAllCoupon(){
   return await Coupon.find()
  }

  async findCouponById(id){
    return await Coupon.findById(id)
  }

  async findOneCouponByCode(code){
    return  await Coupon.findOne({ code })
  }

  async updateCoupon(id,code,startDate,endDate ,discount){
  return  await Coupon.findByIdAndUpdate(
        id,
        {
          code,
          startDate,
          endDate,
          discount,
        },
        { new: true }
      );
  }

  async deleteCoupon(id){
    return await Coupon.findByIdAndDelete(id);
  }
}
export default new CouponService();
