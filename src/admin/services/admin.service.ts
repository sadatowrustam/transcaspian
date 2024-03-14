/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from "bcryptjs"
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Admin } from 'src/entities/Admin';
import { writeFileSync } from 'fs';
@Injectable()
export class AdminService {
 constructor(@InjectRepository(Admin) private adminModel:Repository<Admin>,
 private jwt:JwtService,
 private config:ConfigService
 ){}

 async signin(dto:any){ 
  const admin=await this.adminModel.findOneBy({username:dto.username})
  if(!admin)
  throw new ForbiddenException("Credentials incorrect")
  const pwMatches=await bcrypt.compare(dto.password, admin.password);
  if(!pwMatches) {
      throw new ForbiddenException("Credentials incorrect")
  }
  delete admin.password
  return this.signToken(admin)
}
 async seed(){
  try {
    const password = await bcrypt.hash('admin', 10);

    const username="admin"
    const new_admin=await this.adminModel.create({
        password,username
    })
    await this.adminModel.save(new_admin);

    return this.signToken(new_admin)

 } catch (error) {
    throw error 
    }
 }
 async edit(body:any,id:number){
  try {
      const password = await bcrypt.hash(body.password, 10);
      await this.adminModel.update({id},{
        password,username:body.username,mail:body.mail
      })  
      const new_admin=await this.adminModel.findOneBy({id})
      new_admin.password=undefined
      console.log(new_admin)
    return this.signToken(new_admin)

} catch (error) {
    throw error 
    }
}
 async signToken(admin:any):Promise<any>{
  const payload={
      id:admin.username
  }
  const token= await this.jwt.signAsync(payload,{
      expiresIn:"24h",
      secret:this.config.get("JWT_SECRET")
  })
  return {access_token:token,admin}
 }
 async uploadAudio(file:Express.Multer.File,id:number){
    const audio="audio.mp3"
    writeFileSync("src/uploads/"+audio,file.buffer)
    this.adminModel.update({id},{audio})
    return "Sucess"
 }
}