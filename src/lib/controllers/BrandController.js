import AsyncHandler from "express-async-handler";
import Brand from "../model/Brand.js";
import BrandService from "../services/BrandService.js";
import HttpStatusCode from "../../common/HttpStatusCode.js";
class BrandController {
  createBrand = AsyncHandler(async (req, res) => {
    const { name } = req.body;
    const existBrand = await BrandService.findOneBrand(name);
    if (existBrand) {
      throw new Error("Brand  already exists");
    }
      const brand = await BrandService.createBrand(name, req.req.userAuthId);
      return res.status(HttpStatusCode.CREATED).json({
        status: "success",
        msg: "Brand created successfully",
        brand,
      });
  });

  getAllBrands = AsyncHandler(async (req, res) => {
    try {
      const brands = await BrandService.findAllBrand();
      return res.status(HttpStatusCode.OK).json({
        status: "success",
        brands,
        msg: "Brands fetched successfully",
      });
    } catch (error) {
      throw error;
    }
  });

  getBrand = AsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      const brand = BrandService.findBrandById(id);
      return res.status(HttpStatusCode.OK).json({
        status: "success",
        brand,
        msg: "brand fetched successfully",
      });
    } catch (error) {
      throw error;
    }
  });

  updateBrand = AsyncHandler(async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    const brand = await BrandService.updateBrand(id, name)
    if (!brand) throw new Error("Brand not found");
    else {
      return res.status(HttpStatusCode.OK).json({
        status: "success",
        brand,
        msg: "update brand successfully",
      });
    }
  });

  deleteBrand = AsyncHandler(async (req, res) => {
    const { id }= req.params;
    try {
     await BrandService.deleteBrand(id)
      return res.status(200).json({
        status: "success",
        msg: "Brand deleted successfully",
      });
    } catch (error) {
      throw error;
    }
  });
}
export default new BrandController();
