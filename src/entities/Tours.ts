/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn,OneToMany, } from "typeorm";
import { Images } from "./Images";

@Entity({name:"tours"})
export class Tours{
    @PrimaryGeneratedColumn()
    id:number
    @Column({nullable:true})
    title:string     
    @OneToMany(()=>Images,(images)=>images.tours)
    images:Images[]
    @Column({nullable:true})
    description:string
    @Column({nullable:true})
    meta_name:string
    @Column({nullable:true})
    meta_keyword:string
    @Column({nullable:true})
    meta_description:string
}