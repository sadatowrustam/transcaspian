/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn,OneToMany, AfterLoad, BeforeInsert } from "typeorm";
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
    }
    @BeforeInsert()
    change(data:string){
        this.meta_keyword=JSON.stringify(data)
    }
}