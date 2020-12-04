import {
    Entity,
    Column,
    ManyToMany,
    OneToMany,
    ManyToOne,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    OneToOne
  } from "typeorm";
import { Store } from "./Store";
import { Client } from "./Client";
import { Clients_Events } from "./Clients_Events";


  
  @Entity()
  export class Event {


    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    eventName: string;

    @Column()
    eventType: string;
  
    @OneToMany(() => Clients_Events, (clientevent) => clientevent.event)
    Clients_Events: Clients_Events[];

    @ManyToOne(() => Store, (store) => store.id)
    store: Store;


    


    @Column('date')
    eventDate: Date;
 
    @Column()
    @CreateDateColumn()
    dateCreation: Date;
  }
  
  
  
  
  
  
  
  