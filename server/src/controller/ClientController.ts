import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { Client } from "../entity/Client";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { Store } from "../entity/Store";
import { Clients_Stores } from "../entity/Clients_Stores";
import { Clients_Events } from "../entity/Clients_Events";
import { Contact } from "../entity/Contact";
import { ProductLine } from "../entity/ProductLine";
import { Order } from "../entity/Order";


export default class ClientController {

  static listAll = async (req: Request, res: Response) => {
    //Get Clients from database
    const clientRepository = getRepository(Client);
    const usersClients = await clientRepository.find({
    });


    //Send the users object
    res.send(usersClients);
  };

  static newClient = async (req: Request, res: Response) => {
    //Get parameters from the body
    // just send date in english format  (YYYY/MM/dd)
    let { firstName, lastName, password, address, email, phoneNumber, birthDate, postalCode, city } = req.body;
    console.log(firstName, lastName, password, address, email, phoneNumber, birthDate, postalCode, city)
    let client = new Client();
    client.firstName = firstName;
    client.lastName = lastName;
    client.password = password;
    client.address = address;
    client.email = email;
    client.postalCode = postalCode;
    client.phoneNumber = phoneNumber;
    client.role = "CLIENT";
    client.countryCode = "countryCode";
    client.country = "country";
    client.city = city;
    client.fidelityPoints = 0;
    client.requestCode = 1111;
    client.birthDate = birthDate
    //console.log(phoneNumber)
    //Validade if the parameters are ok
    const errors = await validate(client);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Hash the password, to securely store on DB
    client.hashPassword();
    //Try to save. If fails, the phoneNumber is already in use
    const clientRepository = getRepository(Client);
    try {
      await clientRepository.save(client);
    } catch (e) {
      res.status(409).send("Phone Number already in use");
      return;
    }
    //If all ok, send 201 response
    res.status(201).send("Client created");
  };

  /* static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id =  req.params.id;
  
    //Get the user from database
    const adminRepository = getRepository(Admin);
    try {
      const user = await adminRepository.findOneOrFail(id, {
        select: ["id", "username", "role"] //We dont want to send the password on response
      });
    } catch (error) {
      res.status(404).send("User not found");
    }
  }; 
   */

  static editClient = async (req: Request, res: Response) => {
    //Get values from the body
    const { firstName, lastName, phoneNumber, email, address, postalCode, birthDate, city, password, image } = req.body;

    //Try to find client on database
    const clientRepository = getRepository(Client);
    let client: Client;
    try {
      client = await clientRepository.findOneOrFail({ where: { phoneNumber: phoneNumber } });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("Client(Phone Number) not found");
      console.log(error)
      return;
    }

    //client.phoneNumber=phoneNumber
    client.firstName = firstName;
    client.lastName = lastName;
    client.email = email;
    client.address = address;
    client.country = "Tunisia";
    client.Image = image;
    // if Register   cad  password  exist
    // else continue cad profile edit
    if (password != null) {
      client.password = password;
      client.hashPassword();
    }

    client.postalCode = postalCode;
    client.city = city;
    client.birthDate = new Date(birthDate);



    // ! Only for adminstrator
    //client.phoneNumber=newPhoneNumber;
    //Validate the new values on model
    const errors = await validate(client);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Try to safe, if fails, that means phoneNumber already in use
    try {
      await clientRepository.save(client);
    } catch (e) {
      res.status(400).send("A problem has been Occured");
      console.log(e);
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };


  static updateClientTokenApp = async (req: Request, res: Response) => {
    //Get values from the body
    const { phoneNumber, apptoken } = req.body;
    console.log(phoneNumber, apptoken)
    //Try to find client on database
    const clientRepository = getRepository(Client);
    let client: Client;
    try {
      client = await clientRepository.findOneOrFail({ where: { phoneNumber: phoneNumber } });
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("Client(Phone Number) not found");
      console.log(error)
      return;
    }
    client.notificationToken = apptoken;
    //Try to safe, if fails, that means phoneNumber already in use
    try {
      await clientRepository.save(client);
    } catch (e) {
      res.status(403).send("A problem has been Occured");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };

  static getOneByPhoneNumber = async (req: Request, res: Response) => {
    //Get the phoneNumber from request body
    let { phoneNumber } = req.body;
    //Get the admin from database
    const clientRepository = getRepository(Client);
    try {
      // const user = await  adminRepository.findOneOrFail({ phoneNumber }); 
      const client = await clientRepository.findOneOrFail(phoneNumber, {
        select: ["phoneNumber", "id"] //We dont want to send the password on response
      });
      res.send(client);
    } catch (error) {
      res.status(404).send("client not found");
    }
  };

  static getOneById = async (req: Request, res: Response) => {
    //Get the phoneNumber from request body
    let { id } = req.body;
    //Get the admin from database
    const clientRepository = getRepository(Client);
    try {
      // const user = await  adminRepository.findOneOrFail({ phoneNumber }); 
      const client = await clientRepository.findOneOrFail(id, {
        select: ["phoneNumber", "address", "country", "city", "birthDate"] //We dont want to send the password on response
      });
      res.send(client);
    } catch (error) {
      res.status(404).send("client not found");
    }
  };
  static deleteClient = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;
    const clientRepository = getRepository(Client);
    let client: Client;
    try {
      client = await clientRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("Client not found");
      return;
    }
    clientRepository.delete(id);
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };


  static me = async (req: Request, res: Response) => {
    //Get the phoneNumber from request body
    const token = <string>req.headers["auth"];
    let jwtPayload;
    try {
      jwtPayload = <any>jwt.verify(token, config.jwtSecret);
      res.locals.jwtPayload = jwtPayload;
    } catch (error) {
      //If token is not valid, respond with 401 (unauthorized)
      res.status(401).send();
      return;
    }

    const { userId } = jwtPayload;
    //Get the Client from database
    const clientRepository = getRepository(Client);
    try {

      // const client = await clientRepository.findOneOrFail({ relations: ["Notifications"], where: { id: userId }}); 
      let client = await clientRepository.createQueryBuilder("client").where("client.id = :id", { "id": userId }).getOne();

      res.send(client);
    } catch (error) {
      console.log(error);
      res.status(404).send("Client not found");
    }
  };


  // GET STORES BY CLIENT

  static getStoresByClientId = async (req: Request, res: Response) => {
    //Get the ClientId from request body
    let { ClientId } = req.body;

    const storeRepository = getRepository(Store);
    const CLients_StoresRepository = getRepository(Clients_Stores)
    let clients_stores: Clients_Stores[]

    try {
      let client = await storeRepository.findOneOrFail({ where: { id: ClientId } })
      clients_stores = await CLients_StoresRepository.find({ relations: ["store"], where: { client: client } })

      console.log(clients_stores)
      res.status(200).send(clients_stores)
    } catch (error) {
      res.status(404).send("StoreID doesnt exist ");
    }
  };

  // GET EVENTS BY CLIENT
  static getEventsByClientId = async (req: Request, res: Response) => {
    //Get the ClientID

    let { ClientId } = req.body;
    //Get the repostories
    const clientRepository = getRepository(Client);
    const CLients_EventRepository = getRepository(Clients_Events)
    let client
    try {
      client = await clientRepository.findOneOrFail({ where: { id: ClientId } })
      console.log(client)
    } catch (error) {
      res.status(403).send("ClientId doesnt exist ");
    }

    try {
      let event = await CLients_EventRepository.find({ relations: ["event", "store"], where: { client: client } })
      console.log(event)
      res.status(200).send(event)
    } catch (error) {
      res.status(404).send("StoreID doesnt exist ");
    }
  };
  static clientContact = async (req: Request, res: Response) => {
    //Get the storeID,Message from request body
    let { ClientId, Message } = req.body;
    console.log(ClientId, Message);
    //Get the repostories
    const clientRepository = getRepository(Client);
    const contactRepository = getRepository(Contact);

    let client;
    let contactt = new Contact();
    try {
      client = await clientRepository.findOneOrFail({ where: { id: ClientId } })
      contactt.Client = client.id;
      contactt.message = Message;
      contactt = await contactRepository.save(contactt);
      console.log(client)
      res.status(200).send("Success message sent")
    } catch (error) {


      res.status(400).send("Failed message send ");

    }
  };


  static getTransaction = async (req: Request, res: Response) => {
    //Get the storeID,Message from request body
    let { ClientId } = req.body;

    //Get the repostories
    const clientRepository = getRepository(Client);
    const OrderRepository = getRepository(Order);

    let client
    try {
      client = await clientRepository.findOneOrFail({ where: { id: ClientId } })
      console.log(client)
    } catch (error) {
      res.status(403).send("ClientId doesnt exist ");
    }
    try {
      //productLine = await productLinesReposotiry.createQueryBuilder("productline").leftJoin("productline.orderClient","client").where("productline.orderClient = :id", { "id": ClientId }).getMany()
      let orders = await OrderRepository.createQueryBuilder("order").leftJoin("order.client", "client").leftJoinAndSelect("order.productslines", "productslines").leftJoinAndSelect("order.store", "store").leftJoinAndSelect("productslines.product", "product").where("order.client = :id", { "id": ClientId }).getMany();
      //var  orders = await OrderRepository.find({ relations: ["client","productslines"], where: { client: client } })


      res.status(200).send(orders);
    } catch (error) {
      console.log(error)


      res.status(400).send("A problem has been occured ");

    }
  };



  static getTransactionById = async (req: Request, res: Response) => {
    //Get the storeID,Message from request body
    let { ClientId, TransactionId } = req.body;

    //Get the repostories
    const clientRepository = getRepository(Client);
    const OrderRepository = getRepository(Order);

    let client
    try {
      client = await clientRepository.findOneOrFail({ where: { id: ClientId } })
      console.log(client)
    } catch (error) {
      res.status(403).send("ClientId doesnt exist ");
    }
    try {
      //productLine = await productLinesReposotiry.createQueryBuilder("productline").leftJoin("productline.orderClient","client").where("productline.orderClient = :id", { "id": ClientId }).getMany()
      let orders = await OrderRepository.createQueryBuilder("order").leftJoin("order.client", "client").leftJoinAndSelect("order.productslines", "productslines").leftJoinAndSelect("order.store", "store").leftJoinAndSelect("productslines.product", "product").where("order.client = :id", { "id": ClientId }).where("order.id = :trid", { "trid": TransactionId }).getMany();
      //var  orders = await OrderRepository.find({ relations: ["client","productslines"], where: { client: client } })


      res.status(200).send(orders);
    } catch (error) {
      console.log(error)


      res.status(400).send("A problem has been occured ");

    }


  };


  static getTransactionByStoreID = async (req: Request, res: Response) => {
    //Get the storeID,Message from request body
    let { ClientId, StoreId } = req.body;

    //Get the repostories
    const clientRepository = getRepository(Client);
    const OrderRepository = getRepository(Order);

    let client
    try {
      client = await clientRepository.findOneOrFail({ where: { id: ClientId } })
      console.log(client)
    } catch (error) {
      res.status(403).send("ClientId doesnt exist ");
    }
    try {
      //productLine = await productLinesReposotiry.createQueryBuilder("productline").leftJoin("productline.orderClient","client").where("productline.orderClient = :id", { "id": ClientId }).getMany()
      let orders = await OrderRepository.createQueryBuilder("order").leftJoin("order.client", "client").leftJoinAndSelect("order.productslines", "productslines").leftJoinAndSelect("order.store", "store").leftJoinAndSelect("productslines.product", "product").where("order.client = :id", { "id": ClientId }).where("store.id = :trid", { "trid": StoreId }).getMany();
      //var  orders = await OrderRepository.find({ relations: ["client","productslines"], where: { client: client } })


      res.status(200).send(orders);
    } catch (error) {
      console.log(error)


      res.status(400).send("A problem has been occured ");

    }


  };

  // Stat for flutter ( APP CLIENT)
  static StatsChart = async (req: Request, res: Response) => {
    //Get the client phone Number
    let { phoneNumber } = req.body;
    const clientRepository = getRepository(Client);
    const OrderRepository = getRepository(Order);


    try {
    } catch (error) {
      console.log(error)
      res.status(409).send("Phone Number doesnt exist ");
    }
    // ! OK

    //let clientstoresTopCustomers = await CLients_StoresRepository.createQueryBuilder("clientstore").leftJoin("clientstore.client", "client").where("clientstore.store = :id", { "id": store.id }).andWhere("client.verified = :verif", { "verif": true }).select(["client.firstName", "client.lastName", "clientstore.pointsInCurrentStore", "client.Image"]).orderBy({ "clientstore.pointsInCurrentStore": "DESC" }).limit(3).getRawMany();
    //let clientstoresMostActiveCustomers = await OrderRepository.createQueryBuilder("order").leftJoin("order.client", "client").leftJoin("order.store", "store").where("store.id = :id", { "id": store.id }).andWhere("client.verified = :verif", { "verif": true }).groupBy("client.id").select(["COUNT(order.id) AS nbr", "client.firstName", "client.lastName", "client.fidelityPoints", "client.Image"]).orderBy({ "nbr": "DESC" }).limit(3).getRawMany();
    //let clientstoresTopProducts = await ProductLineRepository.createQueryBuilder("productline").leftJoin("productline.order", "order").leftJoin("productline.product", "product").where("productline.orderStore = :id", { "id": store.id }).groupBy("product.id").select(["COUNT(product.id) AS nbr", "product.ProductName", "product.Image"]).orderBy({ "nbr": "DESC" }).limit(3).getRawMany();

    let orderChart : JSON[] = await OrderRepository.createQueryBuilder("order").leftJoin("order.client", "client").where("client.phoneNumber = :phonenumber", { "phonenumber": phoneNumber }).select(["COUNT(order.id) AS nbr", "MONTH(order.date) AS mth"]).groupBy("mth").orderBy({ "mth": "DESC" }).limit(3).getRawMany();
    //let profilestat1 = await OrderRepository.createQueryBuilder("order").leftJoin("order.client", "client").where("client.phoneNumber = :phonenumber", { "phonenumber": phoneNumber }).where("order.FPused = :verif", { "verif": true }).select(["COUNT(order.id) AS nbr"]).getRawMany();
    console.log( "date : " )
    let month = new Date().getMonth()+1

    let statResp: JSON[] ;

    const map = Object.keys(orderChart).map((key) => [key, orderChart[key]]);
    let map2 = new Map();

    for (let [key, value] of map) {
      //console.log(value['mth'])
      if (value['mth']== month-2|| value['mth']== month-1|| value['mth']== month)
      {
      
        map2.set(value['mth'],value['nbr']);
      }
      console.log(map2)


      
    }


    await res.status(200).send(JSON.stringify(Array.from(map2.entries())));
  };


  static StatsProfile = async (req: Request, res: Response) => {
    //Get the client phone Number
    let { phoneNumber } = req.body;
    const clientRepository = getRepository(Client);
    const OrderRepository = getRepository(Order);


    try {
    } catch (error) {
      console.log(error)
      res.status(409).send("Phone Number doesnt exist ");
    }
    // ! OK

    //let clientstoresTopCustomers = await CLients_StoresRepository.createQueryBuilder("clientstore").leftJoin("clientstore.client", "client").where("clientstore.store = :id", { "id": store.id }).andWhere("client.verified = :verif", { "verif": true }).select(["client.firstName", "client.lastName", "clientstore.pointsInCurrentStore", "client.Image"]).orderBy({ "clientstore.pointsInCurrentStore": "DESC" }).limit(3).getRawMany();
    //let clientstoresMostActiveCustomers = await OrderRepository.createQueryBuilder("order").leftJoin("order.client", "client").leftJoin("order.store", "store").where("store.id = :id", { "id": store.id }).andWhere("client.verified = :verif", { "verif": true }).groupBy("client.id").select(["COUNT(order.id) AS nbr", "client.firstName", "client.lastName", "client.fidelityPoints", "client.Image"]).orderBy({ "nbr": "DESC" }).limit(3).getRawMany();
    //let clientstoresTopProducts = await ProductLineRepository.createQueryBuilder("productline").leftJoin("productline.order", "order").leftJoin("productline.product", "product").where("productline.orderStore = :id", { "id": store.id }).groupBy("product.id").select(["COUNT(product.id) AS nbr", "product.ProductName", "product.Image"]).orderBy({ "nbr": "DESC" }).limit(3).getRawMany();

    // let orderChart = await OrderRepository.createQueryBuilder("order").leftJoin("order.client", "client").where("client.phoneNumber = :phonenumber", { "phonenumber": phoneNumber }).select(["COUNT(order.id) AS nbr", "MONTH(order.date) AS mth"]).groupBy("mth").orderBy({ "mth": "DESC" }).limit(3).getRawMany();
    let profilestat1 = await OrderRepository.createQueryBuilder("order").leftJoin("order.client", "client").where("client.phoneNumber = :phonenumber", { "phonenumber": phoneNumber }).where("order.FPused = :verif", { "verif": true }).select(["COUNT(order.id) AS nbr"]).getRawMany();




    // let statResp: any = {  "chart": orderChart,"ordersfp":profilestat1 };

    await res.status(200).send(profilestat1);

  };

















};
