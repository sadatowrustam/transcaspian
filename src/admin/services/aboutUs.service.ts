/* eslint-disable prettier/prettier */
import {  BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import * as sharp from "sharp"
import {v4} from "uuid"
import { Images } from 'src/entities/Images';
import { Aboutus } from 'src/entities/Aboutus';
import * as fs from "fs"
@Injectable()
export class AboutusService {
 constructor(
    @InjectRepository(Aboutus) private aboutUsModel:Repository<Aboutus>, 
    @InjectRepository(Images) private imagesModel:Repository<Images>,
    
   ){}
   async seed(){
    const seed=await this.aboutUsModel.create()
    await this.aboutUsModel.save(seed)
    return "Sucess"
   }
  async getAboutus(){
    const about_us=await this.aboutUsModel.findOne({where:{id:1},relations:["images"]})
    about_us.description=JSON.parse(about_us.description)
    about_us.header=JSON.parse(about_us.header)
    return about_us
  }
  async editAboutUs(body:any){
    await this.aboutUsModel.update({id:1},{description:JSON.stringify(body.description),header:JSON.stringify(body.header)})
    return "Sucess"
  }
  async uploadImage(files:Express.Multer.File[],about_us:any){
    if(files.length===0) throw new BadRequestException("Please provide a picture")
    for (const file of files){
      const image=v4()+".webp" 
      await sharp(file.buffer).webp().toFile("src/uploads/"+image)
      const new_image=await this.imagesModel.create({image,about_us})
      await this.imagesModel.save(new_image)
  }
  return "Sucess"
  }
  async deleteImage(id:number){
    const image=await this.imagesModel.findOneBy({id}) 
    if(!image) throw new NotFoundException()
    fs.unlink("src/uploads/"+image.image,(err)=>{
      if(err) throw new Error(err.message)
    })
    await this.imagesModel.delete({id})
    return "Sucess"
  }

}