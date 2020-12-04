import {
    Entity,
    Column,
    PrimaryColumn,
    OneToOne,
    CreateDateColumn,
    JoinColumn,ManyToOne
   
  } from "typeorm";
import { Manager } from "./Manager";
import { Client } from "./Client";
import { Store } from "./Store";



  
@Entity()
export class Clients_Stores{
  
@ManyToOne(() => Client,(client)=> client.id,{primary:true, onDelete: 'CASCADE'}) 
client: Client;
@ManyToOne(() => Store,(store)=>store.id,{primary:true,cascade:true}) 
store: Store;
@Column({default:0})
pointsInCurrentStore:number;


@Column({default:false})
birthdayStatus:Boolean;


@Column({default:false})
getBirthdayPoints:Boolean;

@Column()
@CreateDateColumn()
date: Date;


  }