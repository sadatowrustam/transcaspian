/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards} from '@nestjs/common';
import { JwtGuard } from '../guard'
import { TipsService } from '../services/tips.service';
@Controller('admin/tips')
@UseGuards(JwtGuard)
export class TipsControllers {
 constructor(private tipsService:TipsService){}
  @Post()
  createTip(@Body() body:any){ 
   return this.tipsService.create(body)
  }
  @Get()
  getAllTours(){
    return this.tipsService.getAll()
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
