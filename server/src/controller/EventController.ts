import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Event } from "../entity/Event";
import { validate } from "class-validator";


export default class EventController {

    static listAll = async (req: Request, res: Response) => {
        //Get events from database
        const eventRepository = getRepository(Event);
        const events = await eventRepository.find({
        });
        //Send the events object
        res.send(events);
    };


    static editEvent = async (req: Request, res: Response) => {
        //Get values from the body
        const { id, eventName, eventType,eventDate } = req.body;
        console.log(req.body)
        //Try to find event on database
        const eventRepository = getRepository(Event);
        let event: Event;
        try {
            event = await eventRepository.findOneOrFail({ where: { id: id } });
        } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("Event not found");
            console.log(error)
            return;
        }

        //client.phoneNumber=phoneNumber
        event.eventName = eventName;
        event.eventType = eventType;
        event.eventDate = eventDate;

  //  product.PromoPrice = PromoPrice;
 //   product.ReductionPerc = ReductionPerc;
   // product.FP = FP;

    
    const errors = await validate(event);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Try to save ; 
    try {
      await eventRepository.save(event);
    } catch (e) {
      res.status(409).send("Error has been occured try again !");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };



    static getOneById = async (req: Request, res: Response) => {
        const { eventid } = req.body;
        //Get the event from database
        const eventRepository = getRepository(Event);
        try {

            const event = await eventRepository.findOneOrFail({where:{id:eventid}});
            res.send(event);
        } catch (error) {
            res.status(404).send("event not found");
        }
    };


    static deleteEvent = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id = req.params.id;
        const eventRepository = getRepository(Event);
        let event: Event;
        try {
            event = await eventRepository.findOneOrFail(id);
        } catch (error) {
            res.status(404).send("event not found");
            return;
        }
        eventRepository.delete(id);
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
    };



};

