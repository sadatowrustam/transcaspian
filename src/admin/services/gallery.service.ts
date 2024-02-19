/* eslint-disable prettier/prettier */
import {  BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import * as sharp from "sharp"
import {v4} from "uuid"
import * as fs from "fs"
import { Gallery } from 'src/entities/Gallery';
import { promisify } from 'util';
@Injectable()
export class GalleryService {
 constructor(
    @InjectRepository(Gallery) private galleryModel:Repository<Gallery>, 
   ){}
  async getGallery(){
    const gallery=await this.galleryModel.find()
    return gallery
  }
  async getOne(id:number){
    const one_gallery=await this.galleryModel.findOneBy({id})
    return one_gallery
  }
  async addGallery(body:any){
    const new_gallery=await this.galleryModel.create({...body})
    await this.galleryModel.save(new_gallery)
    return new_gallery
    
  }
  async uploadImage(file:Express.Multer.File){
    const type=file.mimetype.split("/")[0]
    if(!file) throw new BadRequestException("Please provide a picture")
    let name=""
  if(type=="image"){
    name=v4()+".webp"
    await sharp(file.buffer).webp().toFile("src/uploads/"+name)
  }
    else if(type=="video"){
      name=v4()+".webp"
      const func=promisify(fs.writeFile)
      await func("src/uploads/"+name+".mp4",file.buffer)
    }
    else throw new BadRequestException("Please provide a video(mp4) or picture(jpg,jpeg and etc.)")
    const new_gallery=await this.galleryModel.create({type,file:name})
    await this.galleryModel.save(new_gallery)
    return "Sucess"  
  }
  async deleteImage(id:number){
    const one_gallery=await this.galleryModel.findOneBy({id})
    if(!one_gallery) throw new NotFoundException()
    fs.unlink("src/uploads/"+one_gallery.file,(err)=>{ 
      if(err) throw new Error(err.message)
    })
    await this.galleryModel.delete({id}) 
    return "Sucess"
 
  }

}