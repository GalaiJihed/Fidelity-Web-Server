import {
    Entity,
    Column,
    ManyToMany,
    OneToMany
  } from "typeorm";
import { User } from "./User";
import { Store } from "./Store";
import { Clients_Stores } from "./Clients_Stores";
import { Clients_Events } from "./Clients_Events";
import { Contact } from "./Contact";
import { Notification } from "./Notifcation";


  
  @Entity()
  export class Client extends User{
  
    @Column({nullable:true})
    requestCode:number;

    @Column('datetime')
    @Column({nullable:true})
    requestCodeEndDate: Date;

    @Column({nullable:true})
    Image: string;

    @Column({default:0})
    fidelityPoints:number;

    @Column({nullable:true})
    notificationToken: string;

    @OneToMany(() => Clients_Stores, (clientstore) => clientstore.client)
    Clients_Stores: Clients_Stores[];

    @OneToMany(() => Clients_Events, (clientevent) => clientevent.client)
    Clients_Events: Clients_Events[];
    
    @OneToMany(() => Notification, (notification) => notification.id)
    Notifications: Notification[];

    @OneToMany(() => Contact, (contact) => contact.Client)
    contact: Contact[];

    
  }
  
  
  
  
  
  
  
  