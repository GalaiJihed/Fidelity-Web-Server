import {
    Entity,
    Column,
    PrimaryColumn,
    OneToOne,
    CreateDateColumn,
    JoinColumn,ManyToOne, PrimaryGeneratedColumn, OneToMany
   
  } from "typeorm";
import { Manager } from "./Manager";
import { Client } from "./Client";
import { Store } from "./Store";
import { Product } from "./Product";
import { ProductLine } from "./ProductLine";


 @Entity()
 export class Order{

    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Client,(client)=> client.id,{cascade:true,primary:true}) 
    client: Client;
    @ManyToOne(() => Store,(store)=>store.id,{cascade:true,primary:true}) 
    store: Store;
    @Column()
    FPused:boolean;
    @Column({ type: "float" })
    totalprice:number;
    // Total price with FP used ; else null
    @Column({ type: "float",default:null })
    newTotalPrice:number;
    // Fp gained if not used
    @Column({ type: "float",default:null })
    fidelityPointsEarned:number;


    @OneToMany(() => ProductLine,(productline)=>productline.order) 
    productslines:Array<ProductLine>;
    @Column()
    @CreateDateColumn()
    date: Date;
    


 }
