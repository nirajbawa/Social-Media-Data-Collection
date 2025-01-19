interface ImageUploadConfig {
  fileSize: number;
  folder: string;
  allowed_formats: string[];
}

export const IMAGE_UPLOAD_CONFIG: ImageUploadConfig = {
  fileSize: 5000000,
  folder: "/social_media_tracker/",
  allowed_formats: ["png", "jpg", "jpeg", "webp"],
};
