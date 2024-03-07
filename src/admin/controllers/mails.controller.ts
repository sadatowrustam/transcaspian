/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Param, ParseIntPipe, Query, UseGuards} from '@nestjs/common';
import { JwtGuard } from '../guard'
import { MailsService } from '../services/mails.service';
@Controller('api/admin/tips')
@UseGuards(JwtGuard)
export class MailsControllers {
 constructor(private mailsService:MailsService){}
  @Get()
  getAllMails(@Query("limit") limit:number,@Query("offset") offset:number){
    return this.mailsService.getAll(limit,offset)
  } 
  @Get(":id")
  getOneMail(@Param("id",ParseIntPipe) id:number){
    return this.mailsService.getOne(id)
  }
  @Delete("/:id")
  deleteMail(@Param("id",ParseIntPipe) id:number){
    return this.mailsService.deleteMail(id)
  }

}
