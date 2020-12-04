import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { Admin } from "../entity/Admin";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { Client } from "../entity/Client";
import { Notification } from "../entity/Notifcation";


class NotificationController{



  static listAll = async (req: Request, res: Response) => {
    //Get events from database
    const notificationRepository = getRepository(Notification);
    const notifications = await notificationRepository.find({
    });
    //Send the events object
    res.send(notifications);
};




    static getNotificationsByClientId = async (req: Request, res: Response) => {
        //Get the phoneNumber from request body
        let { phoneNumber } = req.body;
        
        const clientRepository = getRepository(Client);
        const notificationRepository = getRepository(Notification);
        let client 
        try {
             client = await clientRepository.findOneOrFail({ where: { phoneNumber: phoneNumber } })
        }
        catch(error)
        {
            console.log(error);
            res.status(403).send("Phone Number  doesnt exist ");
        }
        try {
        
           //const notifications = await notificationRepository.find({ relations: ["client"] ,where: { client: client } }); 
           const notifications = await notificationRepository.createQueryBuilder("notification").leftJoinAndSelect("notification.Client","client").where("client.phoneNumber = :phone", { "phone": phoneNumber }).getMany();
          res.status(200).send(notifications);
        } catch (error) {
          console.log(error);
          res.status(400).send("A problem has been occured try later ! ");
        }
      };


      static deleteNotification = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;
        const notificationRepository = getRepository(Notification);
        let notification: Notification;
        try {
          notification = await notificationRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send("notification not found");
            return;
        }
        notificationRepository.delete(id);
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };
      








};
export default NotificationController;