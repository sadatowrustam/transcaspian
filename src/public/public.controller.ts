/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { AboutusService } from 'src/admin/services/aboutUs.service';
import { GalleryService } from 'src/admin/services/gallery.service';
import { MailsService } from 'src/admin/services/mails.service';
import { StaticPlacesService } from 'src/admin/services/static.places.service';
import { TipsService } from 'src/admin/services/tips.service';
import { ToursService } from 'src/admin/services/tours.service';

@Controller('api/public')
export class PublicController {
 constructor(
  private tipsService:TipsService,
  private mainPageService:StaticPlacesService,
  private abotuUsService:AboutusService,
  private galleryService:GalleryService,
  private tripsService:ToursService,
  private mailsService:MailsService
  ){}
 @Get("static")
 getMainPage(){
  return this.mainPageService.getAll()
 }
 @Get("static/:id")
 getOneStaticPlace(@Param("id",ParseIntPipe) id:number){
  return this.mainPageService.getOne(id)
 }
 @Get("about-us")
 getAboutUs(){
  return this.abotuUsService.getAboutus()
 }
 @Get('gallery')
 getGallery(){
  return this.galleryService.getGallery()
 }
 @Get("trips")
 getTrips(@Query("limit") limit:number,@Query("offset") offset:number,@Query("keyword") keyword:string){
  return this.tripsService.getAll(limit,offset,keyword)
 } 
 @Get("trips/:id")
 getOneTrip(@Param("id",ParseIntPipe) id:number){
   return this.tripsService.getOne(id)
 }
 @Get("tips")
 getTips(@Query("limit") limit:number,@Query("offset") offset:number,@Query("keyword") keyword:string){
  return this.tipsService.getAll(limit,offset,keyword)
 }
 @Get("tips/:id")
 getOneTip(@Param("id",ParseIntPipe) id:number){
  return this.tipsService.getOne(id)
 }
 @Post("contact-us")
 sendMail(@Body() body:any){
  return this.mailsService.create(body)
 }
}
