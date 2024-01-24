import Category from "../model/Category.js";

class CategoryService {
  async findOneCategory(name) {
    return await Category.findOne({ name });
  }
  async createCategory(name, image, user) {
    return await Category.create({
        name,
        image,
        user,
      });
  }
  async findAllCategory() {
    return await Category.find();
  }
  async findCategoryById(id){
    return await Category.findById(id)
  }
  async updateCategory(id, name, image){
   return await Category.findByIdAndUpdate(
        id,
        { name, image },
        { new: true }
      );
  }

  async deleteCategory(id){
   return await Category.findByIdAndDelete(id);
  }
}
export default new CategoryService();
