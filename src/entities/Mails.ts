/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name:"mails"})
export class Mails{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @Column()
    mail:string
    @Column()
    text:string       
}