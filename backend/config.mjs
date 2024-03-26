import dotenv from "dotenv";

dotenv.config();

export const urlPort = process.env.URL_PORT || 5555;
export const mongoDBURL = process.env.MONGODB_URL;
export const jwtSecret = process.env.JWT_SECRET;
export const cloudName = process.env.CLOUD_NAME;
export const cloudApiKey = process.env.CLOUD_API_KEY;
export const cloudApiSecret = process.env.CLOUD_API_SECRET;
