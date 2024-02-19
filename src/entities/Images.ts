/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn,ManyToOne } from "typeorm";
import { StaticPlaces } from "./StaticPlaces";
import { Aboutus } from "./Aboutus";
import { Tours } from "./Tours";

@Entity({name:"images"})
export class Images{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    image:string
    @ManyToOne(()=>StaticPlaces,(place)=>place.images)
    place:StaticPlaces
    @ManyToOne(()=>Aboutus,(about_us)=>about_us.images)
    about_us:Aboutus
    @ManyToOne(()=>Tours,(tours)=>tours.images)
    tours:Tours
   }