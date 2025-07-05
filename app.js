// Enable environment variables
require("@dotenvx/dotenvx").config({
  // Ignore environment files named '.env' as we have multiple config files
  path: [".env"],
  ignore: ["MISSING_ENV_FILE"],
});

const express = require("express");
const cors = require("cors");

const routes = require("./routes"); 

const PORT = process.env.PORT || 4000;

const app = express();

const origins = process.env.ALLOWED_ORIGINS;

if (origins) {
  const allowedOrigins = origins.split(",");
  app.use(cors({ origin: allowedOrigins }));
}
app.use(express.json());

// Routes binding with the app
app.use('/api', routes);


app.listen(PORT, () => {
  console.log(
    `Server running on port ${process.env.PORT}, Environment: ${process.env.NODE_ENV}`
  );
});
