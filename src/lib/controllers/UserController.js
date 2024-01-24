import User from "../model/User.js";
import AsyncHandler from "express-async-handler";
import { generateToken } from "../../utils/generateToken.js";
import bcrypt from "bcryptjs";
import { hash } from "../../common/helpers/hashPassword.js";

class UserController {
  registerUser = AsyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;
    //check user exists
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      throw new Error("User already exists");
    } else {
      //hash
      const hashPassword = await hash(password);
      //create user
      const user = await User.create({
        fullName,
        email: email.toLowerCase(),
        password: hashPassword,
      });
      res.status(201).json({
        status: "success",
        msg: "User registered successfully",
        data: user,
      });
    }
  });

  login = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email: email.toLowerCase() });
    if (userFound && (await bcrypt.compare(password, userFound?.password))) {
      res.status(200).json({
        status: "success",
        msg: "User login successfully",
        data: userFound,
        token: generateToken(userFound?.id),
      });
    } else {
      throw new Error("Invalid credentials");
    }
  });
  getUserProfile = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.userAuthId).populate("orders");
    res.status(200).json({
      status: "success",
      user,
      msg: "User profile fetched successfully",
    });
  });

  updateShippingAddress = AsyncHandler(async (req, res) => {
    const {
      firstName,
      lastName,
      address,
      city,
      postalCode,
      province,
      country,
    } = req.body;
    try {
      const user = await User.findByIdAndUpdate(
        req.userAuthId,
        {
          ShippingAddress: {
            firstName,
            lastName,
            address,
            city,
            postalCode,
            province,
            country,
          },
          hasShippingAddress: true,
        },
        { new: true }
      );
      res.status(200).json({
        status: "success",
        user: user,
        msg: "Shipping address updated successfully",
      });
    } catch (error) {
      throw error;
    }
  });
}
export default new UserController();
