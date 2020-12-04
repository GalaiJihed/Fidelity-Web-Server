import { Router } from "express";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import ProductController from "../controller/ProductController";

const router = Router();

// Product //
//Get all Products ( FOR ADMIN )
router.get("/all",[checkJwt, checkRole(["MANAGER","ADMIN"])],  ProductController.listAll);
//New Product
router.post("/new",[checkJwt, checkRole(["ADMIN","MANAGER"])],  ProductController.newProduct);
//Edit Product
router.post("/edit",[checkJwt, checkRole(["ADMIN","MANAGER"])],  ProductController.editProduct);
//get  Products by StoreId
router.post("/getByStoreId",[checkJwt, checkRole(["ADMIN","MANAGER","CLIENT"])],   ProductController.getProductsByStoreId);
//Delete Product
router.delete("/delete/:id([0-9]+)",[checkJwt, checkRole(["ADMIN","MANAGER"])],  ProductController.deleteProduct);
//update product for promotion
router.post("/update",[checkJwt, checkRole(["ADMIN","MANAGER"])],ProductController.setReductionForAProduct);

router.post("/editwithimage",[checkJwt, checkRole(["ADMIN","MANAGER"])], ProductController.editProductWithImage);


export default router;

