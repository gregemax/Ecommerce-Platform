import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    v2.config({
      api_secret: 'kouLe01iZU5vVK2f0OGUjPHVBvo',
      api_key: '415935595172263',
      cloud_name: 'dmkicbywv',
    });
  }
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    console.log(file);
    
    return new Promise((resolve, reject) => {
      v2.uploader
        .upload(file.path, (error, result) => {
          if (error) return reject(error);
          console.log(result);
          
          return resolve(result);
        })
      
    });
  }

  async deleteImage(publicId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      v2.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
}
