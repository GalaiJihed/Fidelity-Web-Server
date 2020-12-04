import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Admin } from "../entity/Admin";
import { Manager } from "../entity/Manager";
import { Client } from "../entity/Client";



export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;
    const role = res.locals.jwtPayload.role;

    console.log(role);
    if (role == "MANAGER") {
      //Get user role from the database
      const managerRepository = getRepository(Manager);
      let manager: Manager;

      try {
        manager = await managerRepository.findOneOrFail(id);
      } catch (id) {
        res.status(401).send();
      }

      //Check if array of authorized roles includes the user's role
      if (roles.indexOf(manager.role) > -1) next();

      else res.status(401).send();


    }
    else if (role == "ADMIN") {

      //Get user role from the database

      const adminRepository = getRepository(Admin);
      let admin: Admin;

      try {
        admin = await adminRepository.findOneOrFail(id);
      } catch (id) {
        res.status(401).send();
      }

      //Check if array of authorized roles includes the user's role
      if (roles.indexOf(admin.role) > -1) next();

      else res.status(401).send();


    }


    else {

      //Get user role from the database

      const clientRepository = getRepository(Client);
      let client: Client;

      try {
        client = await clientRepository.findOneOrFail(id);
      } catch (id) {
        res.status(401).send();
      }

      //Check if array of authorized roles includes the user's role
      if (roles.indexOf(client.role) > -1) next();

      else res.status(401).send();


    }

  }

};