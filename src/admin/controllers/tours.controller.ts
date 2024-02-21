/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtGuard } from '../guard'
import { FilesInterceptor } from '@nestjs/platform-express';
import { ToursService } from '../services/tours.service';
@Controller('api/admin/trips')
@UseGuards(JwtGuard)
export class ToursControllers {
 constructor(private toursService:ToursService){}
  @Post()
  createTour(@Body() body:any){ 
    console.log(12)
   return this.toursService.create(body)
  }
  @Get()
  getAllTours(@Query("limit") limit:number,@Query("offset") offset:number,@Query("keyword") keyword:string){
    return this.toursService.getAll(limit,offset,keyword) 
  } 
  @Get(":id")
  getOnePlace(@Param("id",ParseIntPipe) id:number){
    return this.toursService.getOne(id)
  }
  @Patch(":id")
  editPlace(@Body() body:any,@Param("id" ,ParseIntPipe) id:number){
    return this.toursService.edit(body,id)
  }
  @Post("upload-image/:id")
  @HttpCode(200)
  @UseInterceptors(FilesInterceptor("images")) 
   uploadImage(@UploadedFiles() files:Express.Multer.File[],@Param("id",ParseIntPipe) id:number){
    return this.toursService.uploadImage(files,id)
  }
  @Delete("/:id")
  deleteTour(@Param("id",ParseIntPipe) id:number){
    return this.toursService.deleteTour(id)
  }
  @Delete("image/:id")
  deleteImage(@Param("id", ParseIntPipe) id:number){
    return this.toursService.deleteImage(id)
  }
}
