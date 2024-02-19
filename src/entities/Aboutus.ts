/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn,OneToMany } from "typeorm";
import { Images } from "./Images";

@Entity({name:"about_us"})
export class Aboutus{
    @PrimaryGeneratedColumn()
    id:number
    @Column({default:"[]"})
    header:string        
    @OneToMany(()=>Images,(images)=>images.about_us)
    images:Images[]
    @Column({default:"[]"})
    description:string
}