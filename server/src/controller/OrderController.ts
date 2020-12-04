import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { Client } from "../entity/Client";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { Store } from "../entity/Store";
import { Product } from "../entity/Product";
import { Order } from "../entity/Order";
import { Clients_Stores } from "../entity/Clients_Stores";
import { ProductLine } from "../entity/ProductLine";



export default class OrderController{

    //New Order
    static newOrder = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { StoreId,Products, ClientId,Fidelitypointsused,Totalprice } = req.body;
    console.log(req.body);
    //get Repos
    const storeRepository = getRepository(Store);
    const productRepository = getRepository(Product);
    const clientRepository = getRepository(Client);
    const orderRepository = getRepository(Order);
    const ProductLineRepository = getRepository(ProductLine);
    const CLients_StoresRepository = getRepository(Clients_Stores);
    //Variables
    let  store:Store;
    let  client:Client ;
    let  client_store:Clients_Stores;
    let  order:Order =new Order();
    order.totalprice=Totalprice;
   
    
    try {
      client_store = await CLients_StoresRepository.findOneOrFail({where:{client:ClientId,store:StoreId},relations: ["store","client"]})
      client=client_store.client;
      store=client_store.store;
    }catch(error)
    {
      res.status(400).send("A problem has been occured with client_store");
      return;
    }
 

 
    

    order.client=client;
    order.store=store;
    let somFPFromPorducts=0
    Products.forEach(async element => {
    somFPFromPorducts+= element.FP*element.quantity;

});
if (Fidelitypointsused==null)
{
  //Fidelity points not used ( no value from android )
  order.FPused=false;
  order.fidelityPointsEarned=somFPFromPorducts;
  client.fidelityPoints+=somFPFromPorducts;
  client_store.pointsInCurrentStore+=somFPFromPorducts;
}
else
{
  if (client_store.client.verified==false)
  {
    console.log ("Account not verfied you cannot use your FP please proceed to register")
    res.status(403).send("Account not verfied you cannot use your FP please proceed to register");
    return;
  }
  if (client.fidelityPoints<=Fidelitypointsused)
  {
   res.status(402).send("Client dont have enough Points to use");
   console.log("Client dont have enough Points to use")
   return;
  }
  //Fidelity points  used (value from android )
  order.FPused=true;
  client.fidelityPoints-=Fidelitypointsused;
  order.fidelityPointsEarned=0;
  order.newTotalPrice=Totalprice-(Fidelitypointsused/1000);
  console.log("Fidelity Points Used")

}
console.log(order);
try{
  await orderRepository.save(order);
  await clientRepository.save(client);
  await CLients_StoresRepository.save(client_store);
}catch(error)
{

}
   // begin fetch products JSON
   
    Products.forEach(async element => {
      let  productLine = new ProductLine();
     productLine.product=element.ProductId
     productLine.quantity=element.quantity;
     productLine.order=order;
     console.log(element.FP);
     somFPFromPorducts+= element.FP*element.quantity;
     await ProductLineRepository.save(productLine);  
});
console.log(somFPFromPorducts);




    //If all ok, send 201 response
    res.status(201).send(order);
  };





};
