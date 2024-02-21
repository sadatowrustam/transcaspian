/* eslint-disable prettier/prettier */
import { Controller, Get,Param, Res} from '@nestjs/common';
import { ImagesService } from './image.service';

@Controller('api/image')
export class ImageController {
  constructor(
      private imagesService:ImagesService
    ){}
  @Get(':id')
  async getImage(@Param('id') id: string,@Res() res) {
    return this.imagesService.sendImage(id,res)
  }
}
