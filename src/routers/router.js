import express from 'express';
import userRoutes from './userRoute.js';
import productRoutes from './productRoute.js';
import brandRoutes from './brandRoutes.js';
import categoryRoutes from './categoryRoute.js';
import colorRoutes from './colorRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import orderRoutes from './orderRoutes.js';
import couponRoute from './couponRoute.js';
const Routes = express.Router();
Routes.use("/users/", userRoutes);
Routes.use("/products/", productRoutes);
Routes.use("/categories/", categoryRoutes);
Routes.use("/brands/", brandRoutes);
Routes.use("/colors/", colorRoutes);
Routes.use("/reviews/", reviewRoutes);
Routes.use("/orders/", orderRoutes);
Routes.use("/coupons/", couponRoute);

export default Routes;