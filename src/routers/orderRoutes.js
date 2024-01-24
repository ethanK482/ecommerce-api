import express from 'express';
import { isLogin } from '../common/middlewares/isLogin.js';
import { isAdmin } from '../common/middlewares/isAdmin.js';
import OrderController from '../lib/controllers/OrderController.js';

const orderRoutes = express.Router();

orderRoutes.post("/",isLogin,OrderController.createOrder);
orderRoutes.get("/",isLogin,OrderController.getAllOrders);
orderRoutes.get("/:id",isLogin,OrderController.getOneOrder);
orderRoutes.post("/",isLogin,OrderController.createOrder);
orderRoutes.put("/update/:id",isLogin,isAdmin,OrderController.updateOrder);
orderRoutes.get("/sales/sum",isLogin, OrderController.getSaleStatistic);

export default orderRoutes;
