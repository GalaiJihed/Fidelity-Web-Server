import {
    Entity,
    Column,
    PrimaryColumn,
    OneToOne,
    CreateDateColumn,
    JoinColumn,ManyToOne, PrimaryGeneratedColumn
   
  } from "typeorm";
import { Manager } from "./Manager";
import { Client } from "./Client";
import { Store } from "./Store";
import { Product } from "./Product";
import { Order } from "./Order";


 @Entity()
 export class ProductLine{


    @ManyToOne(() => Product,(product)=>product.id,{primary:true})
    product: Product;
    @ManyToOne(() => Order,(order)=>order.id,{cascade:true,primary:true})
    order: Order;
    @Column()
    quantity: number;
    @Column()
    @CreateDateColumn()
    date: Date;
    


 }
