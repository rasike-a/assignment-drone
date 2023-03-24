import schedule from "node-schedule";
import colors from "colors";

import logger from "./utils/default.logger.js";
import { executeBatteryStatusLogger } from "./utils/utils.js";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) {
    logger.error(`Issue in starting using port ${PORT}`);
  } else {
    logger.info(
      `Server running in development mode on port ${PORT}`.yellow.bold
    );

    schedule.scheduleJob("*/5 * * * *", () => {
      console.log("Executing for every 5 minutes!");
      executeBatteryStatusLogger();
    });
  }
});
