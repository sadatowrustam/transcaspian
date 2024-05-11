/* eslint-disable prettier/prettier */
import { AfterLoad, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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