import AsyncHandler from "express-async-handler";
import CategoryService from "../services/CategoryService.js";
import HttpStatusCode from "../../common/HttpStatusCode.js";
class CategoryController{
  createCategory = AsyncHandler(async (req, res) => {
    const { name } = req.body;
    const existCategory = await CategoryService.findOneCategory(name);
    if (existCategory) {
      throw new Error("Category  already exists");
    }
      const category = await CategoryService.createCategory(name.toLowerCase(),req.file.path, req.userAuthId )
     return res.status(HttpStatusCode.CREATED).json({
        status: "success",
        msg: "Category created successfully",
        category,
      });

  });

  getAllCategory = AsyncHandler(async (req, res) => {
    try {
      const categories = await CategoryService.findAllCategory();
     return res.status(HttpStatusCode.OK).json({
        status: "success",
        categories,
        msg: "Categories fetched successfully",
      });
    } catch (error) {
      throw error;
    }
  });

  getCategory = AsyncHandler(async (req, res) => {
    const { id } = req.params.id;
    const category = await CategoryService.findCategoryById(id);
    if (category) {
     return res.status(HttpStatusCode.OK).json({
        status: "success",
        category,
        msg: "Category fetched successfully",
      });
    } else throw new Error("category not found");
  });

  updateCategory = AsyncHandler(async (req, res) => {
    const id = req.params.id;
    const { name, image } = req.body;
    const category =  await CategoryService.updateCategory(id, name, image)
    if (!category){
      throw new Error("Category not found");
    }
     return res.status(HttpStatusCode.OK).json({
        status: "success",
        category,
        msg: "update category successfully",
      });
  });

  deleteCategory = AsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      await CategoryService.deleteCategory(id)
    return  res.status(HttpStatusCode.OK).json({
        status: "success",
        msg: "Category deleted successfully",
      });
    } catch (error) {
      throw error;
    }
  });
}
export default new CategoryController()