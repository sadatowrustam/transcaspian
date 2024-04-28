/* eslint-disable prettier/prettier */
import { Controller, Delete, Get,HttpCode,Param, ParseIntPipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtGuard } from '../guard'
import { FilesInterceptor } from '@nestjs/platform-express';
import { GalleryService } from '../services/gallery.service';
@Controller('api/admin/gallery')
@UseGuards(JwtGuard)
export class GalleryController {
 constructor(private galleryService:GalleryService){}
  @Get()
  getGallery(){
    return this.galleryService.getGallery()
  } 
  @Get(":id")
  getOne(@Param("id", ParseIntPipe) id:number){
    return this.galleryService.getOne(id)
  }
  @HttpCode(200) 
  @Post()
  @UseInterceptors(FilesInterceptor("images")) 
   async uploadImage(@UploadedFile() file:Express.Multer.File[]){
     return this.galleryService.uploadImage(file)
  }
  @Delete(":id")
  deleteImage(@Param("id", ParseIntPipe) id:number){
    return this.galleryService.deleteImage(id)
  }  
}
