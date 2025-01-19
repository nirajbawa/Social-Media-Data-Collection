import multer, { MulterError } from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary";
import { Request, Response, NextFunction } from "express";
import { IMAGE_UPLOAD_CONFIG } from "../../constant/uploadsConts";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: async (req: Request, file: any) => {
    return {
      folder: IMAGE_UPLOAD_CONFIG.folder, // Optional - specify the folder in Cloudinary
      allowed_formats: IMAGE_UPLOAD_CONFIG.allowed_formats, // Optional - specify allowed formats
      resource_type: "auto", // Optional - specify the resource type ('auto', 'image', 'raw')
      public_id: FileName(), // Custom filename generation
    };
  },
});

const FileName = (): string => {
  const randomInt = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;
  const fileName = `${randomInt}_${Date.now()}`;
  return fileName;
};

const upload = multer({
  storage: storage,
  limits: { fileSize: IMAGE_UPLOAD_CONFIG.fileSize },
}).single("file");

const imageUploadMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  upload(req, res, async (err: any) => {
    if (err instanceof MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .send("File size too large. Maximum size is 10MB");
      }
      console.log(err);
      return res.status(500).send(err);
    } else if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    if (!req.file) {
      next();
    } else {
      next();
    }
  });
};

export default imageUploadMiddleware;
