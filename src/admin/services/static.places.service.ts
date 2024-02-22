/* eslint-disable prettier/prettier */
import {  Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { StaticPlaces } from 'src/entities/StaticPlaces';
import * as sharp from "sharp"
import {v4} from "uuid"
import { Images } from 'src/entities/Images';
@Injectable()
export class StaticPlacesService {
 constructor(
    @InjectRepository(StaticPlaces) private staticPlacesModel:Repository<StaticPlaces>,
    @InjectRepository(Images) private imagesModel:Repository<Images>
 ){}
 async seed(){
      const places = [
        {
          name: "Paris, France",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Paris_-_Eiffel_Tower_-_July_2019.jpg/220px-Paris_-_Eiffel_Tower_-_July_2019.jpg",
          description: "City of lights and romance, known for its Eiffel Tower, Louvre Museum, and Notre Dame Cathedral."
        },
        {
          name: "Kyoto, Japan",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Kiyomizu-dera_Kyoto.jpg/220px-Kiyomizu-dera_Kyoto.jpg",
          description: "Ancient capital of Japan, famous for its temples, gardens, and geisha culture."
        },
        {
          name: "New York City, USA",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/New_York_City_Skyline.jpg/220px-New_York_City_Skyline.jpg",
          description: "Bustling metropolis, a diverse global hub with iconic landmarks like the Statue of Liberty and Times Square."
        },
        {
          name: "Marrakech, Morocco",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Jemaa_el-Fnaa_Marrakech.jpg/220px-Jemaa_el-Fnaa_Marrakech.jpg",
          description: "Vibrant city in North Africa, known for its colorful souks, lively squares, and historical buildings."
        },
        {
          name: "Great Barrier Reef, Australia",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Great_Barrier_Reef_Australia.jpg/220px-Great_Barrier_Reef_Australia.jpg",
          description: "Largest coral reef system in the world, teeming with diverse marine life and a major tourist destination."
        },
        {
          name: "Taj Mahal, India",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Taj_Mahal_Agra_India.jpg/220px-Taj_Mahal_Agra_India.jpg",
          description: "White marble mausoleum built by Mughal emperor Shah Jahan for his third wife Mumtaz Mahal."
        },
        {
          name: "Machu Picchu, Peru",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Machu_Picchu_-_Peru_-_2007-08-24.jpg/220px-Machu_Picchu_-_Peru_-_2007-08-24.jpg",
          description: "15th-century Inca citadel nestled high in the Andes Mountains, a UNESCO World Heritage Site."
        },
        {
          name: "Iceland",
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Jokulsarlon_glacial_lagoon_Iceland.jpg/220px-Jokulsarlon_glacial_lagoon_Iceland.jpg",
          description: "Volcanic island nation with dramatic landscapes including glaciers, waterfalls, geysers, and black sand beaches."
        }
      ];
      for (const place of places) {
        const new_place=await this.staticPlacesModel.create({...place})
        await this.staticPlacesModel.save(new_place);
    }
    return "Sucess"
    }
 async getAll(){
    const places=await this.staticPlacesModel.find()
    return places
 }
 async getOne(id:number){
    const staticPlace=await this.staticPlacesModel.findOne({where:{id},relations:["images"]})
    if(!staticPlace) throw new NotFoundException()
    return staticPlace
    }
 async edit(body:any,id:number){
  const staticPlace=await this.staticPlacesModel.findOneBy({id})
  if(!staticPlace) throw new NotFoundException()
  try {
      await this.staticPlacesModel.update({id},{
        ...body
    })  
    return "Sucess"
} catch (error) {
    throw error 
    }
}
 async uploadImage(files:Express.Multer.File[],id:number){
    const place=await this.staticPlacesModel.findOneBy({id})
    if(!place) throw new NotFoundException()
    for (const file of files){
        const image=v4()+".webp" 
        await sharp(file.buffer).webp().toFile("src/uploads/"+image)
        const new_image=await this.imagesModel.create({image,place})
        await this.imagesModel.save(new_image)
    }
    return "Sucess"
}  
async uploadIcon(file:Express.Multer.File,id:number){
  const place=await this.staticPlacesModel.findOneBy({id})
  if(!place) throw new NotFoundException()
  const icon=id+"-place.icon.webp"
  await sharp(file.buffer).webp().toFile("src/uploads/"+icon)
  await this.staticPlacesModel.update({id},{icon})
  return "Sucess"
} 
async deleteImage(id:number){
    await this.imagesModel.delete({id})
    return "Sucess"
}

}