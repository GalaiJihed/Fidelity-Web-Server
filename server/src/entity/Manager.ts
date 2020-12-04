import {
    Entity,
    Column,
    OneToOne,
    JoinColumn
  } from "typeorm";
import { User } from "./User";
import { Store } from "./Store";


  
  @Entity()
  export class Manager extends User{
    @Column()
    SubscriptionType: string;
    @Column('date',{nullable:true,default:null})
    SubscriptionEndDate: Date;
    @Column({default:0})
    NumberOfSMS:number;
    @Column({default:0})
    NumberOfNotification:number;

    @OneToOne(() => Store, (store) => store.StoreManager)
    @JoinColumn()
    
    store:Store

  }
  
  
  
  
  
  
  
  