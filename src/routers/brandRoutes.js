import express from "express";

import BrandController from "../lib/controllers/BrandController.js";
import { isLogin } from "../common/middlewares/isLogin.js";
import { isAdmin } from "../common/middlewares/isAdmin.js";

const brandRoutes = express.Router();
brandRoutes.post("/", isLogin, isAdmin, BrandController.createBrand);
brandRoutes.get("/", BrandController.getAllBrands);
brandRoutes.get("/:id", BrandController.getBrand);
brandRoutes.put("/:id", isLogin, isAdmin, BrandController.updateBrand);
brandRoutes.delete("/:id", isLogin, isAdmin, BrandController.deleteBrand);
export default brandRoutes;
