/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { Admin } from './entities/Admin';
import { StaticPlaces } from './entities/StaticPlaces';
import { MulterModule } from '@nestjs/platform-express';
import { Images } from './entities/Images';
import { Aboutus } from './entities/Aboutus';
import { Gallery } from './entities/Gallery';
import { Tours } from './entities/Tours';
import { Tips } from './entities/Tips';
import { PublicModule } from './public/public.module';
import { Mails } from './entities/Mails';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:"postgres",
      host:"localhost",
      port:5432,
      username:"postgres",
      password:"kuwat2009",
      database:"transcaspian",
      synchronize:true,
      entities:[Admin,StaticPlaces,Images,Aboutus,Gallery,Tours,Tips,Mails]
    }),
    MulterModule.register({
      dest:"./uploads", 
    }),
    AdminModule,
    ConfigModule.forRoot({isGlobal:true}),
    PublicModule, 
  ], 
})
export class AppModule {}  