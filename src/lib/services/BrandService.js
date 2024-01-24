import Brand from "../model/Brand.js";

class BrandService {
  async findOneBrand(name) {
    return await Brand.findOne({ name });
  }
  async createBrand(name, user) {
    return await Brand.create({
      name: name.toLowerCase(),
      user,
    });
  }
  async findAllBrand() {
    return await Brand.find();
  }
  async findBrandById(id){
    return await Brand.findById(id)
  }
  async updateBrand(id, name){
    return await Brand.findByIdAndUpdate(id, { name }, { new: true })
  }

  async deleteBrand(id){
   return await Brand.findByIdAndDelete(id);
  }
}
export default new BrandService();
