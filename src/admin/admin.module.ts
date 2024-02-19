/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/entities/Admin';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategy';
import { StaticPlacesControllers } from './controllers/static.places.controller';
import { StaticPlacesService } from './services/static.places.service';
import { StaticPlaces } from 'src/entities/StaticPlaces';
import { Images } from 'src/entities/Images';
import { AboutusControllers } from './controllers/aboutus.controller';
import { AboutusService } from './services/aboutUs.service';
import { Aboutus } from 'src/entities/Aboutus';
import { Gallery } from 'src/entities/Gallery';
import { GalleryController } from './controllers/gallery.controller';
import { GalleryService } from './services/gallery.service';
import { ToursControllers } from './controllers/tours.controller';
import { ToursService } from './services/tours.service';
import { Tours } from 'src/entities/Tours';
import { TipsControllers } from './controllers/tips.controller';
import { TipsService } from './services/tips.service';
import { Tips } from 'src/entities/Tips';
@Module({
  controllers: [AdminController,StaticPlacesControllers,AboutusControllers,GalleryController,ToursControllers,TipsControllers],
  providers: [AdminService,JwtStrategy,StaticPlacesService,AboutusService,GalleryService,ToursService,TipsService],
  imports:[
    TypeOrmModule.forFeature([Admin,StaticPlaces,Images,Aboutus,Gallery,Tours,Tips]),
    JwtModule.register({}),
    ConfigModule
  ],
})
export class AdminModule {}
 