/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn,OneToMany } from "typeorm";
import { Images } from "./Images";

@Entity({name:"static_places"})
export class StaticPlaces{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @Column({nullable:true})
    icon:string        
    @OneToMany(()=>Images,(images)=>images.place)
    images:Images[]
    @Column({nullable:true})
    description:string
}