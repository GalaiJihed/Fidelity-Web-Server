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

// Get Top FP customer in a store  ( @Param number )
 export const getTopCustomerInStore = async (store:Store,number:number) => {
       const CLients_StoresRepository = getRepository(Clients_Stores);
    
       try{
     let  clientsStores= await CLients_StoresRepository.createQueryBuilder("clientstore").leftJoinAndSelect("clientstore.client","client").where("clientstore.store = :id",{"id":store.id}).orderBy({"clientstore.pointsInCurrentStore":"DESC"}).limit(number).getMany();

            //Solution valable !
          //let clientsStores : Clients_Stores[]
         // clientsStores = await  CLients_StoresRepository.find({where:{store:store},relations: ["store","client"],take:1})
          console.log (clientsStores);
          return   clientsStores
       }catch(error)
       {
          console.log (error);
       }      
  }; 




  