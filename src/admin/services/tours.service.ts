/* eslint-disable prettier/prettier */
import {  Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as sharp from "sharp"
import {v4} from "uuid"
import { Images } from 'src/entities/Images';
import { Tours } from 'src/entities/Tours';
import { unlink } from 'fs';
@Injectable()
export class ToursService {
 constructor(
    @InjectRepository(Tours) private toursModel:Repository<Tours>,
    @InjectRepository(Images) private imagesModel:Repository<Images>
 ){}
 async create(place:any){
      const new_tour=await this.toursModel.create({...place})
      await this.toursModel.save(new_tour)
      return new_tour
    }
 async getAll(){
    const tours=await this.toursModel.find()
    return tours
 }
 async getOne(id:number){
    const one_trip=await this.toursModel.findOne({where:{id},relations:["images"]})
    if(!one_trip) throw new NotFoundException()
    return one_trip
    }
 async edit(body:any,id:number){
  const trip=await this.toursModel.findOneBy({id})
  if(!trip) throw new NotFoundException()
  try {
      await this.toursModel.update({id},{
        ...body
    })  
    return "Sucess"
} catch (error) {
    throw new Error(error.message) 
    }
}
 async uploadImage(files:Express.Multer.File[],id:number){
    const tours=await this.toursModel.findOneBy({id})
    if(!tours) throw new NotFoundException()
    for (const file of files){
        const image=v4()+".webp" 
        await sharp(file.buffer).webp().toFile("src/uploads/"+image)
        const new_image=await this.imagesModel.create({image,tours})
        await this.imagesModel.save(new_image)
    }
    return "Sucess"
}  
async deleteTour(id:number){
  const one_trip=await this.toursModel.findOne({where:{id},relations:["images"]})
  if(!one_trip) throw new NotFoundException()
  for (const image of one_trip.images){
    unlink("src/uploads/"+image.image,(err)=>{
      if(err) throw new Error(err.message)
    })  
  }
  if(!one_trip) throw new NotFoundException()
  await this.imagesModel.delete({tours:one_trip})
  await this.toursModel.delete({id})
  return "Sucess"
  }
async deleteImage(id:number){
  const image=await this.imagesModel.findOneBy({id}) 
  if(!image) throw new NotFoundException()
  unlink("src/uploads/"+image.image,(err)=>{
    if(err) throw new Error(err.message)
  })
  await this.imagesModel.delete({id})
  return "Sucess"
}

}