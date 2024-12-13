import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import multer from 'multer'
import fs from 'fs'
import config from '../config'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

cloudinary.config({
  cloud_name: 'dphjei2ph',
  api_key: config.cloudinary_api_key as string,
  api_secret: config.cloudinary_secret_key,
})

export const ImageUpload = (imageName: string, path: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      {
        public_id: imageName.trim(),
      },
      function (error, result) {
        if (error) {
          reject(error)
        }
        resolve(result as UploadApiResponse)
        fs.unlink(path, err => {
          if (err) {
            console.log(err)
          } else {
            console.log('File is deleted')
          }
        })
      },
    )
  })
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
})

const newStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
})

export const upload = multer({ storage: newStorage })
