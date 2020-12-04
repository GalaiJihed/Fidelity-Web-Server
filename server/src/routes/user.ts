import { Router } from "express";
import AdminController from "../controller/AdminController";
import ClientController from "../controller/ClientController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import ManagerController from "../controller/ManagerController";
import NotificationController from "../controller/NotificationController";

const router = Router();

// ADMIN //
//Get all admins
 router.get("/admins",[checkJwt, checkRole(["ADMIN"])],  AdminController.listAll);
//New Admin
router.post("/admins/new",[checkJwt, checkRole(["ADMIN"])],   AdminController.newAdmin);
//Edit Admin
router.post("/admins/edit",[checkJwt, checkRole(["ADMIN"])],   AdminController.editAdmin);
//Delete Admin
router.delete("/admins/:id([0-9]+)",[checkJwt, checkRole(["ADMIN"])],   AdminController.deleteAdmin);
//Get Admin with PhoneNumber
router.post("/admins/getwithphone",[checkJwt, checkRole(["ADMIN"])],   AdminController.getOneByPhoneNumber);
//Get Current  Admin  Details with TOKEN
router.post("/admins/me",[checkJwt, checkRole(["ADMIN"])],   AdminController.me);

// CLIENT // 
//Get all clients
router.get("/clients",[checkJwt, checkRole(["ADMIN","MANAGER"])],  ClientController.listAll);
//New Client
router.post("/clients/new",[checkJwt, checkRole(["ADMIN","MANAGER","CLIENT"])],  ClientController.newClient);
//Edit clients
router.post("/clients/edit",  ClientController.editClient);
//Delete clients
router.delete("/clients/:id([0-9]+)",[checkJwt, checkRole(["ADMIN","MANAGER","CLIENT"])],  ClientController.deleteClient);
//Get clients with PhoneNumber
router.post("/clients/getwithphone",[checkJwt, checkRole(["ADMIN","MANAGER","CLIENT"])], ClientController.getOneByPhoneNumber);
//Get List Client By Id 
router.post("/clients/getwithid",[checkJwt, checkRole(["ADMIN","MANAGER","CLIENT"])],  ClientController.getOneById);
//Get Current  Client  Details with TOKEN
router.post("/clients/me",[checkJwt, checkRole(["ADMIN","MANAGER","CLIENT"])],  ClientController.me);
// get Stores By ClientId
router.post("/clients/stores",[checkJwt, checkRole(["ADMIN","MANAGER","CLIENT"])],ClientController.getStoresByClientId);
// Get Events by Client 
router.post("/clients/events",ClientController.getEventsByClientId);
// Send Message ( contact us )
router.post("/clients/contact",[checkJwt, checkRole(["ADMIN","MANAGER","CLIENT"])],ClientController.clientContact)
// get Transaction (ALL)
router.post("/clients/transaction",ClientController.getTransaction)
// get Transaction  by  transaction ID
router.post("/clients/transactionbyid",ClientController.getTransactionById)
// get Transaction  Store ID
router.post("/clients/transactionbystoreid",ClientController.getTransactionByStoreID)
// update tokenApp for a client
router.post("/clients/updateToken",ClientController.updateClientTokenApp)
// Get notifications by PhoneNumber
router.post("/clients/getNotifications",[checkJwt, checkRole(["ADMIN","MANAGER","CLIENT"])],NotificationController.getNotificationsByClientId)
// Stats for flutter 
router.post("/clients/statschart",ClientController.StatsChart)
// Stats for flutter 
router.post("/clients/statsprofile",[checkJwt, checkRole(["ADMIN","MANAGER","CLIENT"])],ClientController.StatsProfile)



// Manager // 
//Get all managers
router.get("/managers",  ManagerController.listAll);
//New managers
router.post("/managers/new",[checkJwt, checkRole(["ADMIN","MANAGER","CLIENT"])],ManagerController.newManager);
//Edit managers
router.post("/managers/edit",[checkJwt, checkRole(["ADMIN","MANAGER","CLIENT"])],  ManagerController.editManager);
//Delete managers
router.delete("/managers/:id([0-9]+)",[checkJwt, checkRole(["ADMIN","MANAGER","CLIENT"])],  ManagerController.deleteManager);
//Get managers with PhoneNumber
router.post("/managers/getwithphone",[checkJwt, checkRole(["ADMIN","MANAGER","CLIENT"])],  ManagerController.getOneByPhoneNumber);
//Get Current  Manager  Details with TOKEN
router.post("/managers/me",[checkJwt, checkRole(["ADMIN","MANAGER","CLIENT"])],  ManagerController.me);
//Set SubscriptionTYPE and date
router.post("/managers/subscription",[checkJwt, checkRole(["ADMIN","MANAGER","CLIENT"])],  ManagerController.setSubscriptionType);

export default router;

