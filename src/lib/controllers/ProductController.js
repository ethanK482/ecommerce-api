import AsyncHandler from "express-async-handler";
import Product from "../model/Product.js";
import Category from "../model/Category.js";
import Brand from "../model/Brand.js";
import { mapPathFile } from "../../common/helpers/mapPathFile.js";
import ProductService from "../services/ProductService.js";
import CategoryService from "../services/CategoryService.js";
import HttpStatusCode from "../../common/HttpStatusCode.js";
class ProductController{
  createProduct = AsyncHandler(async (req, res) => {
    const { name, description, brand, category, sizes, colors, price, totalQty } =
      req.body;
    const files = mapPathFile(req.files);
    const productExist = await ProductService.findOneProduct(name)
    if (productExist){
      throw new Error("Product already exists");
    }
    const product = new Product({
      name,
      description,
      brand: brand.toLowerCase(),
      category: category.toLowerCase(),
      sizes,
      colors,
      user: req.userAuthId,
      images : files,
      price,
      totalQty,
    });
    const categoryFound = await CategoryService.findOneCategory( category.toLowerCase());
    if (!categoryFound)
      throw new Error( `Your shop does not have category ${category}`);
    else
      await Category.updateOne(
        { name: category.toLowerCase() },
        { $push: { products: product } }
      );
    const brandFound = await Brand.findOne({ name: brand.toLowerCase() });
    if (!brandFound) throw new Error("Your shop does not have brand " + brand);
    else
     await Brand.updateOne(
        { name: brand.toLowerCase() },
        { $push: { products: product } }
      );
      product.save();
    res.status(HttpStatusCode.CREATED).json({
      status: "success",
      msg: "Product created successfully",
      product,
    });
  });

  getAllProduct = async (req, res) => {
    const { total, results, pagination, products } = await ProductService.findAndCountProduct()
    res.status(200).json({
      status: "success",
      total,
      results,
      pagination,
      msg: "Product fetch successfully",
      products,
    });
  };

  getOneProduct = AsyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id).populate("reviews");;
    if (!product) throw new Error("Product not found");
    else {
      res.status(200).json({
        status: "success",
        product,
        msg: "Product fetch successfully",
      });
    }
  });

  updateProduct = AsyncHandler(async (req, res) => {
    const id = req.params.id;
    const { name, description, brand, category, sizes, colors, price, totalQty } =
      req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, brand, category, sizes, colors, price, totalQty },
      { new: true }
    );
    if (!product) throw new Error("Product not found");
    else {
      res.status(200).json({
        status: "success",
        product,
        msg: "update product successfully",
      });
    }
  });
  deleteProduct = AsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      const product = await Product.findByIdAndDelete(id)
      const category = await Category.findOne({name : product.category})
      const brand = await Brand.findOne({name : product.brand})
      if(category || brand) {
       const indexC =  category?.products?.indexOf(id);
       const indexB =  brand?.products?.indexOf(id);
       category?.products?.splice(indexC, 1);
       brand?.products?.splice(indexB, 1);
       await category?.save();
       await brand?.save();
      }
      res.status(200).json({
        status: "success",
        msg: "Delete successfully",
      });
    } catch (error) {
      throw error;
    }
  });
}
export default new ProductController();