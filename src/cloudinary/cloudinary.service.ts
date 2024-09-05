import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import * as streamifier from 'streamifier';
import * as FileUpload  from "graphql-upload/Upload.js"
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
    file: FileUpload,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {

    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { folder: 'images' },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );

      file.createReadStream().pipe(upload);
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
