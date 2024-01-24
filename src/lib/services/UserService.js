import User from "../model/User.js";

class UserService {
  async findOneUserById(id) {
    return await User.findById(id);
  }
}
export default new UserService();
