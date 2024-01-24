import express from 'express';
import CategoryController from '../lib/controllers/CategoryController.js';
import { isAdmin } from '../common/middlewares/isAdmin.js';
import { isLogin } from '../common/middlewares/isLogin.js';
import upload from '../utils/fileUpload.js';

const categoryRoutes = express.Router();

categoryRoutes.post("/",isLogin,isAdmin,upload.single("file"), CategoryController.createCategory);
categoryRoutes.get("/",CategoryController.getAllCategory);
categoryRoutes.get("/:id",CategoryController.getCategory);
categoryRoutes.put("/:id",isLogin,isAdmin,CategoryController.updateCategory);
categoryRoutes.delete("/:id",isLogin,isAdmin,CategoryController.deleteCategory);
export default categoryRoutes;