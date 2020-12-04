import { Request, Response,NextFunction} from "express";
import { getRepository } from "typeorm";
import { validate, IsDate, IsDateString } from "class-validator";
import { Client } from "../entity/Client";
import { Manager } from "../entity/Manager";
import * as jwt from "jsonwebtoken";
import config from "../config/config";


export default class ManagerController{

static listAll = async (req: Request, res: Response) => {
  //Get managers from database
  const managerRepository = getRepository(Manager);
  const usersManagers = await managerRepository.find({ relations: ["store"]

  });

  //Send the users object
  res.send(usersManagers);
};

static newManager = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { firstName,lastName, password,address,email,phoneNumber,birthDate,postalCode,city} = req.body;
    console.log( firstName,lastName, password,address,email,phoneNumber,birthDate,postalCode,city)
    let manager = new Manager();
    manager.firstName = firstName;
    manager.lastName = lastName;
    manager.password = password;
    manager.address = address;
    manager.email = email;
    manager.postalCode=postalCode;
    manager.phoneNumber = phoneNumber;
    manager.birthDate =birthDate;
    manager.city=city;
    manager.countryCode="countryCode";
    manager.country="country";
    manager.SubscriptionType="Type"
    manager.role ="MANAGER"
    //Validade if the parameters are ok
    const errors = await validate(manager);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Hash the password, to securely store on DB
    manager.hashPassword();
    //Try to save. If fails, the phoneNumber is already in use
    const managerRepository = getRepository(Manager);
    try {
      await managerRepository.save(manager);
    } catch (e) {
      res.status(409).send("Phone Number already in use");
      return;
    }
    //If all ok, send 201 response
    res.status(201).send("Manager created");
  };


 

static editManager = async (req: Request, res: Response) => {
  //Get values from the body
  const { id,firstName,lastName, email,address } = req.body;

  //Try to find client on database
  const managerRepository = getRepository(Manager);
  let manager;
  try {
    manager = await managerRepository.findOneOrFail(id);
  } catch (error) {
    //If not found, send a 404 response
    res.status(404).send("Manager not found");
    return;
  }

  //Validate the new values on model
  manager.firstName = firstName;
  manager.lastName = lastName;
  manager.email = email;
  manager.address=address;
  //manager.phoneNumber=phoneNumber;
  
  const errors = await validate(manager);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }
  //Try to safe, if fails, that means phoneNumber already in use
  try {
    await managerRepository.save(manager);
  } catch (e) {
    res.status(409).send("phoneNumber already in use");
    return;
  }
  //After all send a 204 (no content, but accepted) response
  res.status(204).send();
};

static getOneByPhoneNumber = async (req: Request, res: Response) => {
  //Get the phoneNumber from request body
  let { phoneNumber } = req.body;
  //Get the Manager from database
  const managerRepository = getRepository(Manager);
  try {
    const manager = await managerRepository.findOneOrFail({ where: { phoneNumber: phoneNumber }, relations: ["store"] }); 
    

    res.send(manager);
  } catch (error) {
    res.status(404).send("manager not found");
    
  }
};

static deleteManager = async (req: Request, res: Response) => {
  //Get the ID from the url
  const id = req.params.id;
  const managerRepository = getRepository(Manager);
  let manager: Manager;
  try {
    manager = await managerRepository.findOneOrFail(id);
  } catch (error) {
    res.status(404).send("Manager not found");
    return;
  }
  managerRepository.delete(id);
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
  //Get the admin from database
  const managerRepository = getRepository(Manager);
  try {
  
     const manager = await managerRepository.findOneOrFail({ where: { id: userId }, relations: ["store"], select: ['id','firstName','lastName','NumberOfNotification','NumberOfSMS','SubscriptionType','SubscriptionEndDate'] }); 
    res.send(manager);
  } catch (error) {
    res.status(404).send("manager not found");
  }
};





static setSubscriptionType = async (req: Request, res: Response) => {
  //Get the phoneNumber from request body
  let { phoneNumber,SubscriptionType,SubscriptionEndDate } = req.body;
  //Get the Manager from database
  const managerRepository = getRepository(Manager);
  let manager:Manager
  try {
     manager = await managerRepository.findOneOrFail({ where: { phoneNumber: phoneNumber } })
    

  
  } catch (error) {
    res.status(404).send("manager not found");
    
  }
  manager.SubscriptionType=SubscriptionType;
  manager.SubscriptionEndDate=SubscriptionEndDate;
  try{
await managerRepository.save(manager);
  }
  catch(error)
  {
    console.log(error)
  }


  res.status(200).send(manager);
};


};
