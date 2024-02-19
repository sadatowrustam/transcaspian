/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn,OneToMany } from "typeorm";
import { Images } from "./Images";

@Entity({name:"tours"})
export class Tours{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    title:string     
    @OneToMany(()=>Images,(images)=>images.tours)
    images:Images[]
    @Column({nullable:true})
    description:string
}