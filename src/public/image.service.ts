/* eslint-disable prettier/prettier */
import { Injectable} from '@nestjs/common';
import { Response } from 'express';
// import * as fs from "fs"
@Injectable()
export class ImagesService {
 constructor(){}
 async sendImage(id:string,res:Response){  
  // const filePath="src/uploads/"+id
  return res.sendFile(id,{root:"src/uploads"})
  // const image=fs.createReadStream('src/uploads/'+id)
  // res.setHeader('Content-Type', 'text/plain');
  // res.setHeader('Content-Length', fs.statSync(filePath).size);
  // res.setHeader('Content-Disposition', 'attachment; filename='+id);
  // return image.pipe(res)
 // }
}
 
}