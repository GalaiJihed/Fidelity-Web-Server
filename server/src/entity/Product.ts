import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    OneToMany,
    ManyToOne
  } from "typeorm";
import { Store } from "./Store";


  
  @Entity()
  export class Product {


    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ProductName: string;
  
    @Column({unique:true})
    Reference: string;
  
    @Column({ type: "float" })
    Price: number;
    // A enlever
    @Column({default:0})
    PromoPrice: number;
    // A enlever
    @Column({default:0})
    ReductionPerc: number;

    @Column()
    Image: string;

    @Column({ type: "float" })
    FP: number;

    
    @ManyToOne(type => Store,{onDelete:"CASCADE"})
    @JoinColumn()
    ProductStore: Store;

  }
  
  
  
  
  
  