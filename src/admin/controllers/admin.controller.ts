/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { JwtGuard } from '../guard'
import { GetUser } from '../decorator';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('api/admin')
export class AdminController {
 constructor(private adminService:AdminService){}
 @Post("login")
 @HttpCode(200)
 login(@Body() body:any){
  return this.adminService.signin(body)
 }
 @Post("seed")
 seed(){
  return this.adminService.seed()
 }
 @Patch()
 @UseGuards(JwtGuard)
 editAdmin(@Body() body:any,@GetUser("id") id:number ){
  console.log(body)
  return this.adminService.edit(body,id)
 }
 @UseGuards(JwtGuard)
 @Get("get-me")
 getAdmin(@GetUser() admin:any){
  admin.password=undefined
  return admin
 }
 @Post("upload-audio")
 @UseGuards(JwtGuard)
 @UseInterceptors(FileInterceptor("audio")) 
  uploadImage(@UploadedFile() file:Express.Multer.File,@GetUser("id") id:number){
   return this.adminService.uploadAudio(file,id)
 }
}
