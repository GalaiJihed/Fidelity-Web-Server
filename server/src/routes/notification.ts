import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import ProductController from "../controller/ProductController";
import EventController from "../controller/EventController";
import NotificationController from "../controller/NotificationController";

const router = Router();

// Notification //
//Get all Notification ( FOR ADMIN )
router.get("/all",[checkJwt],  NotificationController.listAll);
//get Notifications by client PhoneNumber
router.post("/getByClient",[checkJwt], NotificationController.getNotificationsByClientId);
//Delete Notification
router.delete("/delete/:id([0-9]+)",[checkJwt],  NotificationController.deleteNotification);


export default router;