import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
    OneToMany
  } from "typeorm";
import { Manager } from "./Manager";
import { Client } from "./Client";
import { Clients_Stores } from "./Clients_Stores";



  
  @Entity()
  export class Store {


    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    StoreName: string;
  
    @Column()
    StoreAdress: string;
  
    @Column({unique:true})
    StoreRef: string;

    @Column()
    StoreType: string;

    @Column()
    Image: string;

    @Column()
    StoreNotes: number;


    
    @OneToOne(() => Manager, (manager) => manager.store)
    @JoinColumn()
    StoreManager:Manager

    @OneToMany(() => Clients_Stores, (clientstore) => clientstore.store)
    Clients_Stores: Clients_Stores[];
    
  }
  
  
  
  
  
  