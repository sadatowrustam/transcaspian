/* eslint-disable prettier/prettier */
import { AfterLoad, BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name:"gallery"})
export class Gallery{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    file:string
    @Column()
    type:string
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