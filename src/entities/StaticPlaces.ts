/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn,OneToMany, AfterLoad } from "typeorm";
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
    @Column({nullable:true})
    meta_name:string
    @Column({nullable:true})
    meta_keyword:string
    @Column({nullable:true})
    meta_description:string
    @AfterLoad()
    transform(){
        if(this.meta_keyword!=null)
            this.meta_keyword=JSON.parse(this.meta_keyword)
        if(this.meta_name!=null)
            this.meta_name=JSON.parse(this.meta_name)
        if(this.meta_description!=null)
            this.meta_description=JSON.parse(this.meta_description)
    }
}