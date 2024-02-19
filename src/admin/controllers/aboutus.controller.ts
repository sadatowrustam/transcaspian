/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get,HttpCode,Param, ParseIntPipe, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtGuard } from '../guard'
import { FilesInterceptor } from '@nestjs/platform-express';
import { AboutusService } from '../services/aboutUs.service';
@Controller('admin/about-us')
@UseGuards(JwtGuard)
export class AboutusControllers {
 constructor(private aboutUsService:AboutusService){}
  @Post("seed")
  seed(){
    return this.aboutUsService.seed()
  }
  @Get()
  getAboutus(){
    return this.aboutUsService.getAboutus()
  } 
  @Patch()
  editPlace(@Body() body:any){
    return this.aboutUsService.editAboutUs(body)
  }
  @HttpCode(200) 
  @Post("upload-image")
  @UseInterceptors(FilesInterceptor("images")) 
   async uploadImage(@UploadedFiles() files:Express.Multer.File[]){
     const about_us=await this.aboutUsService.getAboutus()
     return this.aboutUsService.uploadImage(files,about_us)
  }
  @Delete("images/:id")
  deleteImage(@Param("id", ParseIntPipe) id:number){
    return this.aboutUsService.deleteImage(id)
  }  
}
