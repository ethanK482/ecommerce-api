import AsyncHandler from "express-async-handler";
import Color from "../model/Color.js";
import ColorService from "../services/ColorService.js";
import HttpStatusCode from "../../common/HttpStatusCode.js";
class ColorController{
  createColor = AsyncHandler(async (req, res) => {
    const { name } = req.body;
    const existColor =  await ColorService.findOneColor(name);
    if (existColor) {
      throw new Error("color already exists");
    }
      const color = await ColorService.createColor(name, req.userAuthId)
     return res.status(HttpStatusCode.CREATED).json({
        status: "success",
        msg: "color created successfully",
        color,
      });
  });

  getAllColors = AsyncHandler(async (req, res) => {
    try {
      const colors = await ColorService.findAllColor();
      return res.status(HttpStatusCode.OK).json({
        status: "success",
        colors,
        msg: "colors fetched successfully",
      });
    } catch (error) {
      throw error;
    }
  });

  getColor = AsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      const color = await  ColorService.findColorById(id)
     return res.status(HttpStatusCode.OK).json({
        status: "success",
        color,
        msg: "color fetched successfully",
      });
    } catch (error) {
      throw error;
    }
  });

  updateColor = AsyncHandler(async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    const color = await ColorService.updateColor(id,name)
    if (!color) throw new Error("color not found");
    else {
     return res.status(200).json({
        status: "success",
        color,
        msg: "update color successfully",
      });
    }
  });


  deleteColor = AsyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
      await ColorService.deleteColor(id)
     return res.status(200).json({
        status: "success",
        msg: "color deleted successfully",
      });
    } catch (error) {
      throw error;
    }
  });
}

export default new ColorController();