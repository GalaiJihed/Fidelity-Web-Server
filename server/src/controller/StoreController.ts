import { Request, Response } from "express";
import { getRepository, EntityManager, getManager, Transaction } from "typeorm";
import { validate, validateOrReject } from "class-validator";
import { Product } from "../entity/Product";
import { Store } from "../entity/Store";
import { Client } from "../entity/Client";
import config from "../config/config";
import { Manager } from "../entity/Manager";
import { Contact } from "../entity/Contact";
import { strategy } from "sharp";
import { Clients_Stores } from "../entity/Clients_Stores";
import { Event } from "../entity/Event";
import { getTopCustomerInStore } from "../middlewares/Stats";
import { Clients_Events } from "../entity/Clients_Events";
import { ProductLine } from "../entity/ProductLine";
import { Order } from "../entity/Order";
import * as admin from 'firebase-admin';
const clientTwilio = require('twilio')(config.accountSid, config.authToken);
var serviceAccount = require("../../keys/fidelity-69021-firebase-adminsdk-uhkrv-8ab4cb2dd3.json");
var randomize = require('randomatic');
var FCM = require('fcm-node');
var serverKey = 'AAAAb8sWpQU:APA91bH5bBXlr0lTtTi_y3T53KNn50V_QrylnT6vezRW625BlWZrigIsc_azmkrMKck-6UyOo84hEAkkX3LOxsRkpjN0yaOp6bu-hv9wJjc54W3Ju1u8hn3idG9qFODp7CdNlwHiECMP'; // put your server key here
var fcm = new FCM(serverKey);
const excelToJson = require('convert-excel-to-json');
const path = require('path')



class StoreController {


  static listAll = async (req: Request, res: Response) => {
    //Get Products from database

    const storeRepository = getRepository(Store);
    const stores = await storeRepository.find({ relations: ["StoreManager"] });
    // const stores = await storeRepository.createQueryBuilder("Store").leftJoin("Store.StoreManager", "manager").addSelect(['manager.firstName']).getMany();



    //Send the Products objects
    res.send(stores);
  };

  //New Store
  static newStore = async (req: Request, res: Response) => {
    //Get parameters from the body

    let { StoreName, StoreAdress, StoreRef, StoreType, StoreManager, Image } = req.body;
    console.log(StoreName, StoreAdress, StoreRef, StoreType, StoreManager, Image)
    
    let store = new Store();
    store.StoreAdress = StoreAdress;
    store.StoreName = StoreName;
    store.StoreRef = StoreRef;
    store.StoreType = StoreType;
    store.StoreManager = StoreManager;
    store.Image = Image;
    store.StoreNotes = 0;
    
    //Validade if the parameters are ok
    const errors = await validate(store);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    let manager: Manager
    const managerRepository = getRepository(Manager);
    try {
      manager = await managerRepository.findOneOrFail({ where: { id: StoreManager } })
    } catch (error) {
      res.status(404).send("Please Verify Manager");
      return;

    }
    //Try to save. If fails, the reference exist
    const storeRepository = getRepository(Store);
    manager.store = store;
    try {
      await storeRepository.save(store);
      await managerRepository.save(manager);
    } catch (e) {
      res.status(409).send("Reference already in use");

      return;
    }
    console.log(store.id)
    //If all ok, send 201 response
    res.status(201).send("Store created");
  };



  static checkPhone = async (req: Request, res: Response) => {
    //Get values from the body
    const { phoneNumber, StoreId } = req.body;
    let store;
    let client = new Client();
    //Try to find client on database
    const storeRepository = getRepository(Store);
    const clientRepository = getRepository(Client);
    const CLients_StoresRepository = getRepository(Clients_Stores);
    try {
      store = await storeRepository.findOneOrFail({ where: { id: StoreId } })
    } catch (error) {
      res.status(409).send("StoreID doesnt exist ");
      return;
    }
    try {
      client = await clientRepository.findOneOrFail({ where: { phoneNumber } });
    }
    catch (error) {
      res.status(406).send("Phone Number doesnt exist");
      return;
    }

    try {

      let clients_stores = await CLients_StoresRepository.findOne({ where: { store: store, client: client } })
      if (clients_stores != null) {
        console.log(clients_stores)

        res.status(200).send(client);
        return;
      }

      else {
        console.log(clients_stores)
        let requestcode = randomize('0', 4)
        client.requestCode = requestcode
        clientRepository.save(client)
        clientTwilio.messages
         .create({
           body: 'Please enter the verify code in the tablet in order to verify your pairing ' + requestcode,
           from: '+12058131475',
           to: '+216' + phoneNumber
         })
         .then(message => console.log(message.sid)); 
        //console.log("SEND SMS")
        res.status(403).send("Enter Verify code");
        return;

      }


    } catch (error) {


    }


  };



  static checkRequstCode = async (req: Request, res: Response) => {
    //Get values from the body
    const { phoneNumber, StoreId, requestCode } = req.body;
    let client: Client;
    let client1: Client;
    let store;
    //Try to find client on database
    const storeRepository = getRepository(Store);
    const CLients_StoresRepository = getRepository(Clients_Stores)
    let clients_stores = new Clients_Stores();

    try {
      store = await storeRepository.findOneOrFail({ where: { id: StoreId } })
    } catch (error) {
      res.status(400).send("StoreID doesnt exist ");
    }
    const clientRepository = getRepository(Client);
    try {
      client = await clientRepository.findOneOrFail({ where: { phoneNumber }, relations: ["Clients_Stores"] });

    }
    catch (error) {
      res.status(402).send("Phone Number does not exist");
    }
    if (client.requestCode == requestCode) {
      client.requestCode = null

      clients_stores.client = client
      clients_stores.store = store;
      client.Clients_Stores.push(clients_stores);

      clientRepository.save(client);

      await CLients_StoresRepository.save(clients_stores)
      console.log(client);
      try {
        client1 = await clientRepository.findOneOrFail({ where: { phoneNumber } });
      }
      catch (error) {
        res.status(400).send("A problem has been occured try later ");
      }
      res.status(200).send(client1);
      return;
    }
    else {
      res.status(403).send("Please verify code");
    }
  }
  static getClientsByStoreId = async (req: Request, res: Response) => {
    //Get the storeID from request body
    let { StoreId } = req.body;
    let client: Client;
    //Get the repostories
    const clientRepository = getRepository(Client);
    const storeRepository = getRepository(Store);
    const CLients_StoresRepository = getRepository(Clients_Stores)
    let clients_stores: Clients_Stores[]
    let store;
    try {
      store = await storeRepository.findOneOrFail({ where: { id: StoreId } })
    } catch (error) {
      res.status(400).send("StoreID doesnt exist ");
    }

    try {
      //clients_stores = await CLients_StoresRepository.find({ relations: ["client"], where: { store: store } })
      clients_stores = await CLients_StoresRepository.createQueryBuilder("clientstore").leftJoinAndSelect("clientstore.client", "client").where("clientstore.store = :id", { "id": store.id }).where("client.verified = :verif", { "verif": true }).getMany()

    } catch (error) {
      res.status(400).send("A problem has been occured please retry! ");
    }
    let date: Date = new Date();

    clients_stores.forEach(element => {

      if (element.client.birthDate.getMonth() == date.getMonth() && element.getBirthdayPoints == false) {
        element.birthdayStatus = true;
      }


    });
    console.log(clients_stores)
    res.status(200).send(clients_stores)

  };






  static birthDayPoints = async (req: Request, res: Response) => {
    //Get the storeID,ClientID from request body
    let { StoreId, ClientID } = req.body;
    //Get the repostories
    const storeRepository = getRepository(Store);
    const clientRepository = getRepository(Client);
    const CLients_StoresRepository = getRepository(Clients_Stores);
    let store = new Store();
    let client = new Client();
    let date: Date = new Date();
    let client_store = new Clients_Stores;
    try {
      client_store = await CLients_StoresRepository.findOneOrFail({ where: { client: ClientID, store: StoreId }, relations: ["store", "client"] })
    } catch (error) {
      res.status(400).send("A problem has been occured with client_store");
    }
    // Check for birthday 

    if (client_store.client.birthDate.toDateString() == date.toDateString()) {
      client_store.client.fidelityPoints += 10;
      client_store.getBirthdayPoints = true;
      client_store.pointsInCurrentStore += 10;
      //clientRepository.save(client_store.client)
      CLients_StoresRepository.save(client_store);
    }
    else {
      res.status(403).send("Birthday invalid")
      return;
    }

      clientTwilio.messages
        .create({
         body: 'Happy birthday we already gifted you 10 fidelityPoints from store : '+store.StoreName,
         from: '+12058131475',
         to: '+216'+client.phoneNumber
        })
        .then(message => console.log(message.sid)); 
    console.log("SMS birthday Send")


    // send SMS for client to inform him about his birthday 
    //console.log (store)
    res.status(200).send("Success Added + 10 fidelity Points")

  };

  static contact = async (req: Request, res: Response) => {
    //Get the storeID,Message from request body
    let { StoreId, Message } = req.body;
    //Get the repostories
    const storeRepository = getRepository(Store);
    const contactRepository = getRepository(Contact);

    let store;
    let contact = new Contact();
    try {
      store = await storeRepository.findOneOrFail({ where: { id: StoreId }, relations: ["StoreManager"] })
      contact.StoreManager = store.StoreManager;
      contact.message = Message;
      contact = await contactRepository.save(contact);
      console.log(store)
      res.status(200).send("Success message sent")
    } catch (error) {


      res.status(400).send("StoreID doesnt exist ");

    }
  };

  static createEvent = async (req: Request, res: Response) => {
    //Get Request body
    // notify code to determinate which clients will recieve the event notification either SMS or Notification
    // If notifyWay == 1 : Clients will recieve notification else if notifyWay==2 Clients will recieve SMS
    // If NemberOfClients == 0 : All clients  ; Else the top NumberOfClients

    let { StoreId, EventDate, EventName, EventType, NumberOfClients, NotifyWay } = req.body;
    let NumberOfClients1

    console.log(req.body);
    //Get the repostories
    const storeRepository = getRepository(Store);
    const EventRepository = getRepository(Event);
    const managerRepository = getRepository(Manager);
    const CLients_StoresRepository = getRepository(Clients_Stores)
    const clients_EventsRepository = getRepository(Clients_Events)
    let store;
    let event = new Event();
    try {
      store = await storeRepository.findOneOrFail({ where: { id: StoreId }, relations: ["StoreManager"] })

      //store = await storeRepository.createQueryBuilder("store").innerJoinAndSelect("store.StoreManager", "manager").where("manager.NumberOfSMS >= :number", { "number": 2 }).getOne();
      console.log(store);
    } catch (error) {
      console.log(error)
      res.status(400).send("StoreID doesnt exist ");
    }
    let clientsStores;
    let number;

    event.eventName = EventName;
    event.eventType = EventType;
    event.store = store;

    event.eventDate = new Date(EventDate);
    await EventRepository.save(event);


    try {
      switch (NumberOfClients) {
        case 0: clientsStores = await CLients_StoresRepository.createQueryBuilder("clientstore").leftJoinAndSelect("clientstore.client", "client").where("clientstore.store = :id", { "id": store.id }).orderBy({ "clientstore.pointsInCurrentStore": "DESC" }).getMany();

        case 1: clientsStores = await CLients_StoresRepository.createQueryBuilder("clientstore").leftJoinAndSelect("clientstore.client", "client").where("clientstore.store = :id", { "id": store.id }).orderBy({ "clientstore.pointsInCurrentStore": "DESC" }).limit(5).getMany();

        case 2: clientsStores = await CLients_StoresRepository.createQueryBuilder("clientstore").leftJoinAndSelect("clientstore.client", "client").where("clientstore.store = :id", { "id": store.id }).orderBy({ "clientstore.pointsInCurrentStore": "DESC" }).limit(10).getMany();

        case 3: clientsStores = await CLients_StoresRepository.createQueryBuilder("clientstore").leftJoinAndSelect("clientstore.client", "client").where("clientstore.store = :id", { "id": store.id }).orderBy({ "clientstore.pointsInCurrentStore": "DESC" }).limit(15).getMany();

        case 4: clientsStores = await CLients_StoresRepository.createQueryBuilder("clientstore").leftJoinAndSelect("clientstore.client", "client").where("clientstore.store = :id", { "id": store.id }).orderBy({ "clientstore.pointsInCurrentStore": "DESC" }).limit(20).getMany();
      }
      if (store.StoreManager.NumberOfSMS <= clientsStores.length) {
        res.status(402).send("Not Enough SMS");
        return;
      }

      //console.log(clientsStores)
    }
    catch (error) {
      res.status(400).send("A problem has been occured Try Again ! ");
    }

    // both Notifcation AND SMS 
    if (NotifyWay == 0) {
      clientsStores.forEach(async element => {
        console.log("Client Number " + element.client.phoneNumber)
        //* SMS 
        clientTwilio.messages
          .create({
            body: 'New event ' + EventName + ' at ' + store.StoreName + '. Date : ' + EventDate,
            from: '+12058131475',
            to: '+216' + element.client.phoneNumber
          })
          .then(message => console.log(message.sid));
        store.StoreManager.NumberOfSMS--;
        let clients_event: Clients_Events = new Clients_Events()
        clients_event.client = element.client;
        clients_event.event = event;
        clients_event.store = store;



        // Notification Here
        store.StoreManager.NumberOfNotification--;
        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
          to: element.client.notificationToken,
          collapse_key: 'your_collapse_key',

          notification: {
            title: 'New Event' + EventName,
            body: 'New event ' + EventName + ' at ' + store.StoreName + '. Date : ' + EventDate
          },

          data: {  //you can send only notification or only data(or include both)
            nottype: 'event'
          }
        };
        fcm.send(message, function (err, response) {
          if (err) {
            console.log("Something has gone wrong!");
          } else {
            console.log("Successfully sent with response: ", response);
          }
        });
        await clients_EventsRepository.save(clients_event);

      });
    }
    //  SMS  Only
    else if (NotifyWay == 1) {
      clientsStores.forEach(element => {
        // SMS 
        clientTwilio.messages
          .create({
            body: 'New event ' + EventName + ' at ' + store.StoreName + '. Date : ' + EventDate,
            from: '+12058131475',
            to: '+216' + element.client.phoneNumber
          })
          .then(message => console.log(message.sid));
        store.StoreManager.NumberOfSMS--;

      });

    }
    else {
      clientsStores.forEach(async element => {
        console.log("Client Number " + element.client.phoneNumber)
        let clients_event: Clients_Events = new Clients_Events()
        clients_event.client = element.client;
        clients_event.event = event;
        clients_event.store = store;

        // Notification Here
        store.StoreManager.NumberOfNotification--;
        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
          to: element.client.notificationToken,
          collapse_key: 'your_collapse_key',

          notification: {
            title: 'New Event' + EventName,
            body: 'New event ' + EventName + ' at ' + store.StoreName + '. Date : ' + EventDate
          },

          data: {  //you can send only notification or only data(or include both)
            nottype: 'event'
          }
        };
        fcm.send(message, function (err, response) {
          if (err) {
            console.log("Something has gone wrong!");
          } else {
            console.log("Successfully sent with response: ", response);
          }
        });
        await clients_EventsRepository.save(clients_event);

      });

    }

    //  event.store = store;  
    await managerRepository.save(store.StoreManager);
    res.status(200).send("Event  created")
  };


  static getEventByStoreIdAndDay = async (req: Request, res: Response) => {
    //Get Request body
    let { StoreId, date } = req.body;
    console.log(req.body);
    //Get the repostories
    const storeRepository = getRepository(Store);
    const EventRepository = getRepository(Event);
    let store;
    let event: Event;
    try {
      store = await storeRepository.findOneOrFail({ where: { id: StoreId } })
      event = await EventRepository.findOneOrFail({ where: { store: store, 'eventDate': date } })
      //await EventRepository.save(event);
      console.log(event)
      res.status(200).send(event)
    } catch (error) {
      console.log(error)
      res.status(400).send("StoreID doesnt exist ");
    }
  };



  static getEventsByStoreId = async (req: Request, res: Response) => {
    //Get the storeID

    let { StoreId } = req.body;
    //Get the repostories
    const EventRepository = getRepository(Event);
    const storeRepository = getRepository(Store);

    console.log(StoreId);
    let store;
    let event;
    try {
      store = await storeRepository.findOneOrFail({ where: { id: StoreId }, relations: ["StoreManager"] })

      //store = await storeRepository.createQueryBuilder("store").innerJoinAndSelect("store.StoreManager", "manager").where("manager.NumberOfSMS >= :number", { "number": 2 }).getOne();
      console.log(store);
    } catch (error) {
      console.log(error)
      res.status(400).send("StoreID doesnt exist ");
    }


    try {
      event = await EventRepository.find({ where: { store: store } })
      console.log(event)
      res.status(200).send(event)
    } catch (error) {
      res.status(400).send("StoreID doesnt exist ");
    }
  };


  // TOP WITH FP 
  static getTopClientsInStore = async (req: Request, res: Response) => {
    //Get the storeID
    let { StoreId } = req.body;
    //Get the repostories
    const storeRepository = getRepository(Store);
    const CLients_StoresRepository = getRepository(Clients_Stores);
    let store;


    try {
      store = await storeRepository.findOneOrFail({ where: { id: StoreId } })
      let client_store = await getTopCustomerInStore(store, 5);
      let nom: String;
      //let  client_store =  CLients_StoresRepository.find({where:{store:store},relations: ["store","client"]})
      console.log("////////////////////////");

      await res.status(200).send(await getTopCustomerInStore(store, 1));
    } catch (error) {
      console.log(error)
      res.status(409).send("StoreID doesnt exist ");
    }
  };

  static deleteStore = async (req: Request, res: Response) => {
    //Get the ID from the url
    console.log(req.headers)
    const id = req.params.id;
    const StoreController = getRepository(Store);
    let store: Store;
    try {
      store = await StoreController.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("Store not found");
      return;
    }
    StoreController.delete(store);
    //After all send a 204 (no content, but accepted) response
    res.status(204).send("Store Deleted");
  };


  // Android stats ( 3 )
  static Stats = async (req: Request, res: Response) => {
    //Get the storeID
    let { StoreId } = req.body;
    //Get the repostories
    const storeRepository = getRepository(Store);
    const CLients_StoresRepository = getRepository(Clients_Stores);
    const ProductLineRepository = getRepository(ProductLine);
    const OrderRepository = getRepository(Order);
    let store;


    try {
      store = await storeRepository.findOneOrFail({ where: { id: StoreId } })
    } catch (error) {
      console.log(error)
      res.status(409).send("StoreID doesnt exist ");
    }
    // ! OK

    let clientstoresTopCustomers = await CLients_StoresRepository.createQueryBuilder("clientstore").leftJoin("clientstore.client", "client").where("clientstore.store = :id", { "id": store.id }).andWhere("client.verified = :verif", { "verif": true }).select(["client.firstName", "client.lastName", "clientstore.pointsInCurrentStore", "client.Image"]).orderBy({ "clientstore.pointsInCurrentStore": "DESC" }).limit(3).getRawMany();
    let clientstoresMostActiveCustomers = await OrderRepository.createQueryBuilder("order").leftJoin("order.client", "client").leftJoin("order.store", "store").where("store.id = :id", { "id": store.id }).andWhere("client.verified = :verif", { "verif": true }).groupBy("client.id").select(["COUNT(order.id) AS nbr", "client.firstName", "client.lastName", "client.fidelityPoints", "client.Image"]).orderBy({ "nbr": "DESC" }).limit(3).getRawMany();
    let clientstoresTopProducts = await ProductLineRepository.createQueryBuilder("productline").leftJoin("productline.order", "order").leftJoin("productline.product", "product").leftJoin("order.store", "store").where("store.id = :id", { "id": store.id }).groupBy("product.id").select(["COUNT(product.id) AS nbr", "product.ProductName", "product.Image"]).orderBy({ "nbr": "DESC" }).limit(3).getRawMany();
    let clientstoresChart = await ProductLineRepository.createQueryBuilder("productline").leftJoin("productline.order", "order").leftJoin("productline.product", "product").leftJoin("order.store", "store").where("store.id = :id", { "id": store.id }).select(["COUNT(product.id) AS nbr", "MONTH(productline.date) AS mth"]).groupBy("mth").getRawMany();
    console.log("products")
    console.log(clientstoresTopProducts);




    let statResp: any = { "stat1": clientstoresTopCustomers, "stat2": clientstoresMostActiveCustomers, "stat3": clientstoresTopProducts, "chart": clientstoresChart };

    await res.status(200).send(statResp);

  };




  static editStore = async (req: Request, res: Response) => {
    //Get values from the body
    const { id, StoreName, StoreAdress, StoreRef, StoreType, StoreManager, Image } = req.body;

    console.log(req.body);
    //Try to find client on database
    const storesRepository = getRepository(Store);
    let store: Store;
    try {
      store = await storesRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("Store not found");
      return;
    }

    //Validate the new values on model
    store.StoreName = StoreName;
    store.StoreAdress = StoreAdress;
    store.StoreRef = StoreRef;
    store.Image = Image;
    store.StoreType = StoreType;
    store.StoreManager = StoreManager;
    const errors = await validate(store);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Try to save ; 
    try {
      await storesRepository.save(store);
    } catch (e) {
      res.status(409).send("Error has been occured try again !");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };

  static testNotification = async (req: Request, res: Response) => {

    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
      to: 'APA91bF1Il8iilp265g3r2c4UT0wpr_znT4NL14Q_byei0-pKOJO36lj45AAbQ_YwqFiAF9QNLEL5oSpupdgW0vaXciiHPWD9COqPNH7WFO0ce7JYPfhnnS48vh6xoD55j9i97vvJeD6',
      collapse_key: 'your_collapse_key',

      notification: {
        title: 'Title of your push notification',
        body: 'Body of your push notification'
      },

      data: {  //you can send only notification or only data(or include both)
        my_key: 'my value',
        my_another_key: 'my another value'
      }
    };

    fcm.send(message, function (err, response) {
      if (err) {
        console.log("Something has gone wrong!");
      } else {
        console.log("Successfully sent with response: ", response);
      }
    });
    res.status(204).send();
  };


  static uploadDb = async (req: Request, res: Response) => {
    //Get values from the body
    const { filename, StoreId } = req.body;
    //Try to find store on database
    const storesRepository = getRepository(Store);
    let store: Store;
    try {
      store = await storesRepository.findOneOrFail(StoreId);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("Store not found");
      return;
    }
    const result = excelToJson({
      sourceFile: "D:/Git-Hub/Fidelity-Web/uploads/xcel.xlsx",
      columnToKey: {
        A: 'Reference',
        B: 'ProductName',
        C: 'Price',
      }
    });
    const map = Object.keys(result.products).map((key) => [key, result.products[key]]);
    const productRepo = getRepository(Product);
    for (let [key, value] of map) {
      //console.log(key, value);
      let product: Product;
      let Productentry: Product = value;
      console.log("Products")
      console.log(Productentry)

      product = await productRepo.findOne({ where: { Reference: Productentry.Reference } })
      // reference doent Exist so new product
      if (product == null) {
        console.log("Product NULL")

        try {
          Productentry.ProductStore=store;
          Productentry.FP=Productentry.Price*0.03* 1000;
          Productentry.Image="abc";
          await productRepo.save(Productentry);
        }
        catch (error) {
          console.log(error);
        }

      }
      //reference  Exist so update  product
      else {
        console.log("Product NOT NULL")
        product.ProductName = Productentry.ProductName;
        product.Price = Productentry.Price;
        product.FP = Productentry.Price * 0.03 * 1000;
        try {
          await productRepo.save(product);
        }
        catch (error) {
          console.log(error);
        }
      }
      //await productRepo.save(Products);
    }

    /*  arr[0].entries.forEach(async element1 => {
       
       console.log(element1)
     });*/
    //After all send a 200 (no content, but accepted) response
    res.status(200).send(result.products);
  };
};

export default StoreController;

