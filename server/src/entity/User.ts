import {
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { IsEmail, Min, Max, IsInt, Length, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import * as bcrypt from "bcryptjs";


export abstract  class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  firstName: string;

  @Column({nullable:true})
  lastName: string;

  @Column({nullable:true})
  @IsEmail()
  email: string;

  @Column({nullable:true})
  address: string;

  @Column({ unique: true })
  
  @IsInt()
  @Max(99999999)
  @Min(10000000)
  phoneNumber: number;

  @Column({nullable:true})
  countryCode: String;


  @Column({nullable:true})
  country: String;

  
  @Column('datetime',{nullable:true})
  birthDate: Date;

  @Column({nullable:true})
  postalCode: number;

  
  @Column({nullable:true})
 // @Length(4, 100)
  password: string;

  @Column({default:false})
  verified: boolean;


  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  role: string;

  @Column({nullable:true})
  city: string;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}







