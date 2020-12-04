import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import product from "./product"
import store from "./store"
import history from "./history"
import order from "./order"
import event from "./event"
import notification from "./notification"



const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/product", product);
routes.use("/store", store);
routes.use("/history", history);
routes.use("/order", order);
routes.use("/event", event);
routes.use("/notification", notification);



export default routes;