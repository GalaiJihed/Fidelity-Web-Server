import { Router } from "express";
import AuthController from "../controller/AuthController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();
export default router;