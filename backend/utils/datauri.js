import DataUriParser from "datauri/parser.js";
import path from "path";

const parser = new DataUriParser();

export const getDataUri = (file) => {
  const extName = path.extname(file.originalname); // .pdf
  return parser.format(extName, file.buffer); // returns { content: 'data:application/pdf;base64,...' }
};

export default getDataUri;