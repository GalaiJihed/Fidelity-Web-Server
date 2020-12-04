import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import OrderController from "../controller/OrderController";
import { Store } from "../entity/Store";

const router = Router();
 router.post("/new",[checkJwt, checkRole(["ADMIN","MANAGER"])],  OrderController.newOrder);
export default router;
