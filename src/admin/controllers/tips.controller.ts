/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards} from '@nestjs/common';
import { JwtGuard } from '../guard'
import { TipsService } from '../services/tips.service';
@Controller('api/admin/tips')
@UseGuards(JwtGuard)
export class TipsControllers {
 constructor(private tipsService:TipsService){}
  @Post()
  createTip(@Body() body:any){ 
   return this.tipsService.create(body)
  }
  @Get()
  getAllTours(@Query("limit") limit:number,@Query("offset") offset:number,@Query("keyword") keyword:string){
    return this.tipsService.getAll(limit,offset,keyword)
  } 
  @Get(":id")
  getOnePlace(@Param("id",ParseIntPipe) id:number){
    return this.tipsService.getOne(id)
  }
  @Patch(":id")
  editPlace(@Body() body:any,@Param("id" ,ParseIntPipe) id:number){
    return this.tipsService.edit(body,id)
  }

  @Delete("/:id")
  deleteTour(@Param("id",ParseIntPipe) id:number){
    return this.tipsService.deleteTip(id)
  }

}
