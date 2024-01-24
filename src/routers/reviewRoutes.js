import express from 'express';
import { isLogin } from '../common/middlewares/isLogin.js';
import ReviewController from '../lib/controllers/ReviewController.js';

const reviewRoutes = express.Router();

reviewRoutes.post("/:id",isLogin,ReviewController.createReview);

export default reviewRoutes;