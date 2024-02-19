/* eslint-disable prettier/prettier */
import {  Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tips } from 'src/entities/Tips';
@Injectable()
export class TipsService {
 constructor(
    @InjectRepository(Tips) private tipsModel:Repository<Tips>,
 ){}
 async create(tip:any){
      const new_tip=await this.tipsModel.create({...tip})
      await this.tipsModel.save(new_tip)
      return new_tip
    }
 async getAll(){
    const tips=await this.tipsModel.find()
    return tips
 }
 async getOne(id:number){
    const one_tip=await this.tipsModel.findOne({where:{id}})
    if(!one_tip) throw new NotFoundException()
    return one_tip
    }
 async edit(body:any,id:number){
  const tip=await this.tipsModel.findOneBy({id})
  if(!tip) throw new NotFoundException()
  try {
      await this.tipsModel.update({id},{
        ...body
    })  
    return "Sucess"
} catch (error) {
    throw new Error(error.message) 
    }
}

async deleteTip(id:number){
  const one_tip=await this.tipsModel.findOne({where:{id}})
  if(!one_tip) throw new NotFoundException()
  await this.tipsModel.delete({id})
  return "Sucess"
  }

}