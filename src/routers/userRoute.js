import express from 'express';
import { isLogin } from '../common/middlewares/isLogin.js';
import UserController from '../lib/controllers/UserController.js';
const userRoutes = express.Router();
userRoutes.post("/register",UserController.registerUser);
userRoutes.post("/login",UserController.login);
userRoutes.get("/profile",isLogin,UserController.getUserProfile);
userRoutes.put("/update/shipping",isLogin,UserController.updateShippingAddress);
export default userRoutes;