import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    CreateDateColumn,
    JoinColumn,
    ManyToOne,
    Index
   
  } from "typeorm";
import { Manager } from "./Manager";
import { Client } from "./Client";



  
  @Entity()
  export class Contact{
  

    @PrimaryGeneratedColumn()
    id: number;

  
    @Column()
    message: string;

    @OneToOne(() => Manager, (manager) => manager.store)
    @JoinColumn()
    StoreManager:Manager
    
    @ManyToOne(() => Client,(client)=>client.id,{ nullable: true }) 
    @JoinColumn()
    Client: Client;

    @Column()
    @CreateDateColumn()
    date: Date;


  }