/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn,OneToMany} from "typeorm";
import { Images } from "./Images";

@Entity({name:"about_us"})
export class Aboutus{
    @PrimaryGeneratedColumn()
    id:number
    @Column({default:"[]"})
    header:string        
    @OneToMany(()=>Images,(images)=>images.about_us)
    images:Images[]
    @Column({default:"[]",type:"text"})
    description:string
    @Column({nullable:true})
    meta_name:string
    @Column({nullable:true})
    meta_keyword:string
    @Column({nullable:true})
    meta_description:string

}