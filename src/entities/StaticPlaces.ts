/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn,OneToMany} from "typeorm";
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
    @Column({nullable:true,type:"text"})
    description:string
    @Column({nullable:true})
    meta_name:string
    @Column({nullable:true})
    meta_keyword:string
    @Column({nullable:true})
    meta_description:string
}