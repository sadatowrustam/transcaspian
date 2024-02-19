/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({name:"tips"})
export class Tips{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    title:string     
    @Column({nullable:true})
    description:string
}