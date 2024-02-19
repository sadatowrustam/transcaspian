/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, Patch, Post, UseGuards } from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { JwtGuard } from '../guard'
import { GetUser } from '../decorator';
@Controller('admin')
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
  return this.adminService.edit(body,id)
 }
}
