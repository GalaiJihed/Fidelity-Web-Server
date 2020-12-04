import {
    Entity,
    Column,
    PrimaryColumn,
    OneToOne,
    CreateDateColumn,
    JoinColumn,ManyToOne
   
  } from "typeorm";
import { Client } from "./Client";
import { Event } from "./Event";
import { Store } from "./Store";



  
@Entity()
export class Clients_Events{
  
@ManyToOne(() => Client,(client)=> client.id,{primary:true, onDelete: 'CASCADE' }) 
client: Client;

@ManyToOne(() => Event,(event)=>event.id,{primary:true,onDelete:"CASCADE"}) 
event: Event;
   
@ManyToOne(() => Store, (store) => store.id)
store: Store;

@Column()
@CreateDateColumn()
date: Date;


  }