import Order from "../model/Order.js";

class OrderService{
    async findAllOrders(){
      return  await Order.find()
    }
    async findOrderById(id){
        return await Order.findById(id)
    }

    async updateOrder(id, status){
      return  await Order.findByIdAndUpdate(
            id,
            { status, },
            { new: true }
          );
    }
    async getSaleStatistic(){
        return await Order.aggregate([
            {
              $group: {
                _id: null,
                totalSales: {
                  $sum: "$totalPrice",
                },
                minSale: {
                  $min: "$totalPrice",
                },
                maxSale: {
                  $max: "$totalPrice",
                },
                averageSale: {
                  $avg: "$totalPrice",
                },
              },
            },
          ]);
    }
}
export default new OrderService();