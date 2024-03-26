import { v2 as cloudinary } from "cloudinary";
import { cloudName, cloudApiKey, cloudApiSecret } from "./config.mjs";

const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: cloudApiKey,
    api_secret: cloudApiSecret,
    secure: true,
  });
};

export { configureCloudinary };
