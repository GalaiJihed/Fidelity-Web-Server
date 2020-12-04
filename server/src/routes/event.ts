import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import ProductController from "../controller/ProductController";
import EventController from "../controller/EventController";

const router = Router();

// EVENT //
//Get all EVENT ( FOR ADMIN )
router.get("/all",[checkJwt, checkRole(["ADMIN","MANAGER"])],  EventController.listAll);
//Edit EVENT
router.post("/edit",[checkJwt, checkRole(["ADMIN","MANAGER"])],  EventController.editEvent);
//get  Products by StoreId
router.post("/getById",[checkJwt, checkRole(["ADMIN","MANAGER","CLIENT"])],   EventController.getOneById);
//Delete EVENT
router.delete("/delete/:id([0-9]+)",[checkJwt, checkRole(["ADMIN","MANAGER","CLIENT"])],  EventController.deleteEvent);


export default router;