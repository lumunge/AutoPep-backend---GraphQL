import mongoose from "mongoose";
import config from "config";

// connect to database
const connect = async () => {
  try {
    await mongoose.connect(config.get("dbURI"));
    console.log("DB connected!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connect;
