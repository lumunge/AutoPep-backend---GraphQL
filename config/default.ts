import dotenv from "dotenv";
dotenv.config();

export default {
  dbURI: process.env.DBURI,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
};
