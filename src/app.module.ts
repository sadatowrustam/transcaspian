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
import { TimeoutInterceptor } from './timeout/timeout.interceptor';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:"postgres",
      host:"localhost",
      port:5432,
      username:"postgres",
      password:"5432",
      database:"transcaspian",
      synchronize:true,
      entities:[Admin,StaticPlaces,Images,Aboutus,Gallery,Tours,Tips,Mails]
    }),
    MulterModule.register({
      dest:"./uploads", 
      limits: { fileSize: 524288000 },
    }),
    AdminModule,
    ConfigModule.forRoot({isGlobal:true}),
    PublicModule, 
  ], 
  providers:[TimeoutInterceptor]
})
export class AppModule {}  