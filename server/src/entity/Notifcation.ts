import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    OneToMany,
    ManyToOne,
    CreateDateColumn
  } from "typeorm";
import { Store } from "./Store";
import { Client } from "./Client";


  
  @Entity()
  export class Notification {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    TitleNotification: string;
    @Column()
    BodyNotification: string;
    
    @Column()
    @CreateDateColumn()
    createdAt: Date;
 
    @ManyToOne(client => Client,{onDelete:"CASCADE"})
    @JoinColumn()
    Client: Client;

  }
  
  
  
  
  
  