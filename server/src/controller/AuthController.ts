import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import config from "../config/config";
import { Admin } from "../entity/Admin";
import { Client } from "../entity/Client";
import { Manager } from "../entity/Manager";
import { validate } from "class-validator";
import { json } from "body-parser";
import { Clients_Stores } from "../entity/Clients_Stores";
import { Store } from "../entity/Store";
const clientTwilio = require('twilio')(config.accountSid, config.authToken);
var randomize = require('randomatic');


class AuthController {
  static login = async (req: Request, res: Response) => {
    //Check if username and password are set
    // Type account to determinate if its : CLIENT OR ADMIN OR MANAGER
    let { phoneNumber, password, typeAccount } = req.body;

    let token;

    console.log(req.body);

    //console.log("Phone Number  : "+phoneNumber+" Password : " + password+ " Type Account " +typeAccount);
    if (!(phoneNumber && password && typeAccount)) {
      res.status(400).send();
    }

    let user;
    if (typeAccount == "ADMIN") {
      //Get user from database
      const adminRepository = getRepository(Admin);
      try {
        user = await adminRepository.findOneOrFail({ where: { phoneNumber } });
        token = jwt.sign(
          { userId: user.id, phoneNumber: user.phoneNumber, userName: user.firstName, role: user.role },
          config.jwtSecret,
          { expiresIn: "1000h" }
        );
      } catch (error) {
        res.status(401).send();
        console.log("Wrong phonenumber");
        return;
      }
    }
    else if (typeAccount == "MANAGER") {
      //Get user from database
      const managerRepository = getRepository(Manager);
      try {
        user = await managerRepository.findOneOrFail({ relations: ["store"], where: { phoneNumber } });
        let storeId = user.store;
        let endDateSubscription = user.SubscriptionEndDate;
      
        if (AuthController.compareDate(new Date(),endDateSubscription)==1)
        {
          res.status(403).send("Subscription ended");
          return;
        }
     
        token = jwt.sign(
          { userId: user.id, phoneNumber: user.phoneNumber, userName: user.firstName, storeid: storeId.id, role: user.role },
          config.jwtSecret,
          { expiresIn: "1000h" }
        );
      } catch (error) {
        res.status(401).send();
        console.log("Wrong phonenumber");
        return;
      }
    }
    else if (typeAccount == "CLIENT") {
      //Get user from database
      const clientRepository = getRepository(Client);
      try {
        user = await clientRepository.findOneOrFail({ where: { phoneNumber } });
        token = jwt.sign(
          { userId: user.id, phoneNumber: user.phoneNumber, userName: user.firstName, role: user.role },
          config.jwtSecret,
          { expiresIn: "1000h" }
        );
      } catch (error) {
        res.status(402).send();
        console.log("Wrong phonenumber");
        return;
      }
    }
    if (!user) {
      res.status(401).send();
    }
    //Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      console.log("Wrong password");
      res.status(403).send("Wrong password");
      return;
    }
    //Sing JWT, valid for 1 hour

    let jsonResponse: any = { "token": token, "role": user.role };
    //Send the jwt in the response
    console.log(jsonResponse);

    res.status(200).json((jsonResponse));

  };


/** 
 * Compares two Date objects and returns e number value that represents 
 * the result:
 * 0 if the two dates are equal.
 * 1 if the first date is greater than second.
 * -1 if the first date is less than second.
 * @param date1 First date object to compare.
 * @param date2 Second date object to compare.
 */
public static compareDate(date1: Date, date2: Date): number
{
  // With Date object we can compare dates them using the >, <, <= or >=.
  // The ==, !=, ===, and !== operators require to use date.getTime(),
  // so we need to create a new instance of Date with 'new Date()'
  let d1 = new Date(date1); let d2 = new Date(date2);

  // Check if the dates are equal
  let same = d1.getTime() === d2.getTime();
  if (same) return 0;

  // Check if the first is greater than second
  if (d1 > d2) return 1;
 
  // Check if the first is less than second
  if (d1 < d2) return -1;
}


  static loginangular = async (req: Request, res: Response) => {
    //Check if username and password are set
    // Type account to determinate if its : CLIENT OR ADMIN OR MANAGER
    let { phoneNumber, password } = req.body;
    let token;
    console.log(req.body);
    //console.log("Phone Number  : "+phoneNumber+" Password : " + password+ " Type Account " +typeAccount);
    if (!(phoneNumber && password)) {
      res.status(400).send();
    }
    let user;
    //////if (typeAccount=="ADMIN")
    //Get user from database
    const adminRepository = getRepository(Admin);
    const managerRepository = getRepository(Manager);

    user = await adminRepository.findOne({ where: { phoneNumber } });


    if (user) {
      token = jwt.sign(
        { userId: user.id, phoneNumber: user.phoneNumber, userName: user.firstName, role: user.role },
        config.jwtSecret,
        { expiresIn: "1000h" }
      );
    }
    else {
      try {
        user = await managerRepository.findOneOrFail({ relations: ["store"], where: { phoneNumber } });
        let storeId = user.store;
        token = jwt.sign(
          { userId: user.id, phoneNumber: user.phoneNumber, userName: user.firstName, storeid: storeId.id, role: user.role },
          config.jwtSecret,
          { expiresIn: "1000h" }
        );
      } catch (error) {
        res.status(401).send();
        console.log("Wrong phonenumber");
        return;
      }
    }


    if (!user) {
      res.status(401).send();
    }
    //Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      console.log("Wrong password");
      res.status(403).send("Wrong password");
      return;
    }
    //Sing JWT, valid for 1 hour

    let jsonResponse: any = { "token": token, "role": user.role };
    //Send the jwt in the response
    console.log(jsonResponse);

    res.status(200).json((jsonResponse));

  };

  static newClient = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { phoneNumber } = req.body;
    let client: Client;
    const clientRepository = getRepository(Client);
    client = await clientRepository.findOne({ where: { phoneNumber: phoneNumber, verified: false } })

    if (client) {
      console.log("Exist");
      let requestcode = randomize('0', 4)
      client.requestCode = requestcode;


      try {
        await clientRepository.save(client);
          clientTwilio.messages
      .create({
         body: 'Open fidelity app and  use your code '+requestcode,
         from: '+12058131475',
         to: '+216'+phoneNumber
       })
      .then(message => console.log(message.sid)); 
      } catch (e) {
        res.status(400).send("a problem has been occured in saving client");
        return;
      }
      res.status(201).send("New request code is sent");
      return;
    }
    else {
      client = new Client();
      console.log("doestnexist");
      client.phoneNumber = phoneNumber;
      let requestcode = randomize('0', 4)
      client.requestCode = requestcode
      client.role = "CLIENT"

      try {
        await clientRepository.save(client);
          clientTwilio.messages
      .create({
         body: 'Open fidelity app and  use your code '+requestcode,
         from: '+12058131475',
         to: '+216'+phoneNumber
       })
      .then(message => console.log(message.sid)); 
        res.status(201).send("New client saved Now enter verify Code");
      } catch (e) {
        res.status(401).send("Phone Number already in use");
        return;
      }

      console.log("Message sent")
      //If all ok, send 201 response

    }




    //Validade if the parameters are ok
    /*    const errors = await validate(client);
       if (errors.length > 0) {
         res.status(400).send(errors);
         return;
       } */

    //Try to save. If fails, the phoneNumber is already in use


  };


  static newClientAndroid = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { phoneNumber, StoreId } = req.body;
    console.log(req.body)
    let client: Client = new Client();
    let store: Store;
    // REPOS
    const clientRepository = getRepository(Client);
    const storeRepository = getRepository(Store);
    const CLients_StoresRepository = getRepository(Clients_Stores)


    client.phoneNumber = phoneNumber;
    client.role = "CLIENT"
      clientTwilio.messages
         .create({
            body: 'Welcome to fidelity Please complete your registration in our app.Download it at GooglePlay or AppStore',
            from: '+12058131475',
            to: '+216'+phoneNumber
          })
         .then(message => console.log(message.sid)); 
    try {
      await clientRepository.save(client);
    }
    catch (error) {
      console.log(error);
      res.status(400).send("A problem has been occured while saving client");
    }
    let clients_stores = new Clients_Stores();

    try {
      store = await storeRepository.findOneOrFail({ where: { id: StoreId } })
    } catch (error) {
      res.status(400).send("StoreID doesnt exist ");
    }

    try {
      client = await clientRepository.findOneOrFail({ where: { phoneNumber } });

    }
    catch (error) {
      res.status(400).send("A Problem has been occured");
    }

    clients_stores.client = client;
    clients_stores.store = store;

    try {
      await CLients_StoresRepository.save(clients_stores)
    } catch (error) {
      res.status(400).send("StoreID doesnt exist ");
    }

    res.status(200).send(client);

  };


  //! VerifyCode Function 
  static checkRequstCode = async (req: Request, res: Response) => {
    //Get values from the body
    const { phoneNumber, requestCode } = req.body;
    let client: Client;
    //Try to find client on database
    const clientRepository = getRepository(Client);

    try {
      client = await clientRepository.findOneOrFail({ where: { phoneNumber: phoneNumber, verified: false } })
    } catch (error) {
      res.status(400).send("Please verify your phone Number");
      return;
    }
    if (client.requestCode == requestCode) {
      client.requestCode = null
      client.verified = true;
      clientRepository.save(client);
      console.log(client);
      res.status(200).send("Code verified");
      return;
    }
    else {
      res.status(403).send("Please verify code");
    }
  }




  static changePassword = async (req: Request, res: Response) => {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;
    let user: User;
    //Get parameters from the body
    const { oldPassword, newPassword, typeAccount } = req.body;
    console.log(req);
    if (!(oldPassword && newPassword)) {
      res.status(403).send();
    }


    if (typeAccount == "ADMIN") {
      //Get user from database
      const adminRepository = getRepository(Admin);
      try {
        user = await adminRepository.findOneOrFail({ where: { id } });
        //!HERE
        //Check if old password matchs
        if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
          res.status(401).send("Old password doesnt match");
          return;
        }

        //Validate de model (password lenght)
        user.password = newPassword;
        const errors = await validate(user);
        if (errors.length > 0) {
          res.status(400).send(errors);
          return;
        }
        //Hash the new password and save
        user.hashPassword();
        adminRepository.save(user);
        res.status(200).send("Password updated");
        //!END HERE
      } catch (error) {
        res.status(401).send("Problem occured with Token , please retry later or reconnect");
        return;
      }
    }
    else if (typeAccount == "MANAGER") {
      //Get user from database
      const managerRepository = getRepository(Manager);
      try {
        user = await managerRepository.findOneOrFail({ where: { id } });
        //!HERE
        //Check if old password matchs
        if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
          res.status(401).send("Old password doesnt match");
          return;
        }

        //Validate de model (password lenght)
        user.password = newPassword;
        const errors = await validate(user);
        if (errors.length > 0) {
          res.status(400).send(errors);
          return;
        }
        //Hash the new password and save
        user.hashPassword();
        managerRepository.save(user);
        res.status(200).send("Password updated");
        //!END HERE
      } catch (error) {
        res.status(401).send("Problem occured with Token , please retry later or reconnect");
        return;
      }
    }
    else if (typeAccount == "CLIENT") {
      //Get user from database
      const clientRepository = getRepository(Client);
      try {
        user = await clientRepository.findOneOrFail({ where: { id } });
        //!HERE
        //Check if old password matchs
        if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
          res.status(401).send("Old password doesnt match");
          return;
        }

        //Validate de model (password lenght)
        user.password = newPassword;
        const errors = await validate(user);
        if (errors.length > 0) {
          res.status(400).send(errors);
          return;
        }
        //Hash the new password and save
        user.hashPassword();
        clientRepository.save(user);
        res.status(200).send("Password updated");
        //!END HERE
      } catch (error) {
        res.status(401).send("Problem occured with Token , please retry later or reconnect");
        return;
      }
    }


  };
}
export default AuthController;