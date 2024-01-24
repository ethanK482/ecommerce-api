import express from 'express';
import ColorController from '../lib/controllers/ColorController.js';
import { isLogin } from '../common/middlewares/isLogin.js';
import { isAdmin } from '../common/middlewares/isAdmin.js';

const colorRoutes = express.Router();

colorRoutes.post("/",isLogin,isAdmin,ColorController.createColor);
colorRoutes.get("/",ColorController.getAllColors);
colorRoutes.get("/:id",ColorController.getColor);
colorRoutes.put("/:id",isLogin,isAdmin,ColorController.updateColor);
colorRoutes.delete("/:id",isLogin,isAdmin,ColorController.deleteColor);
export default colorRoutes;