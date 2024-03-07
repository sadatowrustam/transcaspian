/* eslint-disable prettier/prettier */
import {  Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mails } from 'src/entities/Mails';
@Injectable()
export class MailsService {
 constructor(
    @InjectRepository(Mails) private mailsModel:Repository<Mails>,
 ){}
 async create(body:any){
      const new_mail=await this.mailsModel.create({...body})
      await this.mailsModel.save(new_mail)
      return new_mail
    }
 async getAll(take:number,skip:number){
    const tips=await this.mailsModel.find({take,skip,})
    const count=await this.mailsModel.count({})
    return {tips,count}
 }
 async getOne(id:number){
    const one_tip=await this.mailsModel.findOne({where:{id}})
    if(!one_tip) throw new NotFoundException()
    return one_tip
    }
 async edit(body:any,id:number){
  const tip=await this.mailsModel.findOneBy({id})
  if(!tip) throw new NotFoundException()
  try {
      await this.mailsModel.update({id},{
        ...body
    })  
    return "Sucess"
} catch (error) {
    throw new Error(error.message) 
    }
}

async deleteMail(id:number){
  const one_tip=await this.mailsModel.findOne({where:{id}})
  if(!one_tip) throw new NotFoundException()
  await this.mailsModel.delete({id})
  return "Sucess"
  }

}