import Color from "../model/Color.js";
class ColorService {
  async findOneColor(name) {
    return await Color.findOne({ name });
  }
  async createColor(name, user) {
    await Color.create({
      name,
      user,
    });
  }
  async findAllColor(){
    return await Color.find();
  }
  async findColorById(id){
   return await Color.findById(id)
  }

  async updateColor(id, name){
   return await Color.findByIdAndUpdate(
        id,
        { name},
        { new: true }
      );
  }

  async deleteColor(id){
    return  await Color.findByIdAndDelete(id);
  }
}
export default new ColorService();
