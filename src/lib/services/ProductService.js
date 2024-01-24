import Product from "../model/Product.js";

class ProductService {
  async findOneProduct(name) {
    return await Product.findOne({ name });
  }

  async findAndCountProduct() {
    let productQuery = Product.find();
    if (req.query.price) {
      productQuery = productQuery.find({
        price: {
          $gte: req.query.price.split("-")[0],
          $lte: req.query.price.split("-")[1],
        },
      });
    }
    //search by name
    if (req.query.name) {
      productQuery = productQuery.find({
        name: { $regex: req.query.name, $options: "i" },
      });
    }
    //search by brand
    if (req.query.brand) {
      productQuery = productQuery.find({
        brand: { $regex: req.query.brand, $options: "i" },
      });
    }
    //search by category
    if (req.query.category) {
      productQuery = productQuery.find({
        category: { $regex: req.query.category, $options: "i" },
      });
    }
    //search by color
    if (req.query.colors) {
      productQuery = productQuery.find({
        colors: { $regex: req.query.colors, $options: "i" },
      });
    }
    //search by color
    if (req.query.size) {
      productQuery = productQuery.find({
        sizes: { $regex: req.query.size, $options: "i" },
      });
    }
    //pagination
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Product.countDocuments();
    productQuery = productQuery.skip(startIndex).limit(limit);
    const pagination = {};
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }
    const products = await productQuery.populate("reviews");
    return { total, results: products.length, pagination, products };
  }
}
export default new ProductService();
