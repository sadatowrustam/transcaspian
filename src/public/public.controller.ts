/* eslint-disable prettier/prettier */
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AboutusService } from 'src/admin/services/aboutUs.service';
import { GalleryService } from 'src/admin/services/gallery.service';
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
  private tripsService:ToursService
  ){}
 @Get("main")
 getMainPage(){
  return this.mainPageService.getAll()
 }
 @Get("main/:id")
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
 getTrips(){
  return this.tripsService.getAll()
 } 
 @Get("trips/:id")
 getOneTrip(@Param("id",ParseIntPipe) id:number){
   return this.tripsService.getOne(id)
 }
 @Get("tips")
 getTips(){
  return this.tipsService.getAll()
 }
 @Get("tips/:id")
 getOneTip(@Param("id",ParseIntPipe) id:number){
  return this.tipsService.getOne(id)
 }
}
