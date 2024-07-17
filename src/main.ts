import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

import app from './app';
import logger from './common/logger';
import printAsciiArt from './common/helpers/printAsciiArt';

const PORT = process.env.PORT || 3000;

printAsciiArt();

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});
