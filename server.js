// const mongoose = require("mongoose");

import app from "./index.js";

// const { DB_HOST, PORT = 8080 } = process.env;

// mongoose
//   .connect(DB_HOST)
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log("Database connection successful");
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//     process.exit(1);
//   });

app.listen(process.env.PORT || 8080, function () {
  console.log(
    `CORS-enabled web server listening on port ${process.env.PORT || 8080}`
  );
});
