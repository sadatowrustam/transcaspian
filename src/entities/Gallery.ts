/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name:"gallery"})
export class Gallery{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    file:string
    @Column()
    type:string
   }