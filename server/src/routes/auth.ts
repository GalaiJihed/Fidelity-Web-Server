import { Router } from "express";
import AuthController from "../controller/AuthController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();
//Login route for Android&Flutter
router.post("/login", AuthController.login);
//Login route for Angular
router.post("/loginangular", AuthController.loginangular);
// NewClient  Flutter
router.post("/newclient", AuthController.newClient);
// NewClient  Android
router.post("/newclientandroid", AuthController.newClientAndroid);
// Check request code for new client 
router.post("/check", AuthController.checkRequstCode);
//Change my password
router.post("/change-password", [checkJwt], AuthController.changePassword);

export default router;