import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import StoreController from "../controller/StoreController";
import { Store } from "../entity/Store";

const router = Router();

 router.post("/new",[checkJwt, checkRole(["ADMIN"])],  StoreController.newStore);
 router.delete("/delete/:id([0-9]+)",[checkJwt, checkRole(["ADMIN"])],StoreController.deleteStore);
 router.post("/checkphone",[checkJwt, checkRole(["MANAGER","ADMIN","CLIENT"])],StoreController.checkPhone);
 router.post("/edit",[checkJwt, checkRole(["ADMIN"])],StoreController.editStore);
 router.post("/verifycode",[checkJwt, checkRole(["MANAGER","ADMIN","CLIENT"])],StoreController.checkRequstCode);
 router.post("/contact",[checkJwt, checkRole(["MANAGER","ADMIN","CLIENT"])],StoreController.contact);
 router.post("/birthdaypoints",[checkJwt, checkRole(["MANAGER","ADMIN","CLIENT"])],StoreController.birthDayPoints);
 router.get("/stores",StoreController.listAll);
 router.post("/getClientsByStoreId",[checkJwt, checkRole(["MANAGER","ADMIN"])],StoreController.getClientsByStoreId)
 router.post("/createEvent",[checkJwt, checkRole(["MANAGER","ADMIN"])],StoreController.createEvent)
 router.post("/getEvents",[checkJwt, checkRole(["MANAGER"])],StoreController.getEventsByStoreId)
 router.post("/stats",[checkJwt, checkRole(["MANAGER"])],StoreController.Stats)
 router.post("/getEvent",[checkJwt, checkRole(["MANAGER","ADMIN"])],StoreController.getEventByStoreIdAndDay)
 router.post("/testnot",[checkJwt],StoreController.testNotification)
 router.post("/uploadDb",StoreController.uploadDb)

 
export default router;

