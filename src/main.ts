import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

import app from "./app";
import logger from "./common/logger";
import { connectToDb } from "./common/mongoClient";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});

connectToDb();
