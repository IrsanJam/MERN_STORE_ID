import multer from "multer";

const configureMulter = () => {
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });
  return upload;
};

export { configureMulter };
