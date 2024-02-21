/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtGuard } from '../guard'
import { StaticPlacesService } from '../services/static.places.service';
import { FilesInterceptor } from '@nestjs/platform-express';
@Controller('api/admin/static')
@UseGuards(JwtGuard)
export class StaticPlacesControllers {
 constructor(private placeService:StaticPlacesService){}
  @Post("seed")
  @HttpCode(200)
  seed(){
   return this.placeService.seed()
  }
  @Get()
  getAllPlaces(){
   return this.placeService.getAll()
  } 
  @Get(":id")
  getOnePlace(@Param("id",ParseIntPipe) id:number){
   return this.placeService.getOne(id)
  }
  @Patch(":id")
  editPlace(@Body() body:any,@Param("id" ,ParseIntPipe) id:number){
   return this.placeService.edit(body,id)
  }
  @Post("upload-image/:id")
  @UseInterceptors(FilesInterceptor("images")) 
   uploadImage(@UploadedFiles() files:Express.Multer.File[],@Param("id",ParseIntPipe) id:number){
    return this.placeService.uploadImage(files,id)
  }
  @Delete("images/:id")
  deleteImage(@Param("id", ParseIntPipe) id:number){
   return this.placeService.deleteImage(id) 
  }
}
