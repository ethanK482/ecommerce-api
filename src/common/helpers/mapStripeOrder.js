export const mapStripeOrder= (orderItems)=>{
    return  orderItems.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              description: item.description,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.totalQtyBuying,
        };
      });
}