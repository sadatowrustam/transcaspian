/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PublicController } from './public.controller';
import { StaticPlacesService } from 'src/admin/services/static.places.service';
import { AboutusService } from 'src/admin/services/aboutUs.service';
import { GalleryService } from 'src/admin/services/gallery.service';
import { ToursService } from 'src/admin/services/tours.service';
import { TipsService } from 'src/admin/services/tips.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaticPlaces } from 'src/entities/StaticPlaces';
import { Aboutus } from 'src/entities/Aboutus';
import { Gallery } from 'src/entities/Gallery';
import { Tours } from 'src/entities/Tours';
import { Tips } from 'src/entities/Tips';
import { Images } from 'src/entities/Images';
import { ImageController } from './image.controller';
import { ImagesService } from './image.service';
import { Mails } from 'src/entities/Mails';
import { MailsService } from 'src/admin/services/mails.service';

@Module({
  controllers: [PublicController,ImageController],
  providers:[StaticPlacesService,AboutusService,GalleryService,ToursService,TipsService,ImagesService,MailsService],
  imports:[TypeOrmModule.forFeature([StaticPlaces,Aboutus,Gallery,Tours,Tips,Images,Mails])]
})
export class PublicModule {}
