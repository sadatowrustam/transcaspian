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
    @Column({nullable:true,default:new Date()})
    createdAt:Date
    @Column({nullable:true})
    meta_name:string
    @Column({nullable:true})
    meta_keyword:string
    @Column({nullable:true})
    meta_description: string
}