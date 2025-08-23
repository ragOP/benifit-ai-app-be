const dotenv = require("dotenv");
dotenv.config();
const app = require("./app.js");
const connectDB = require("./Db/index.js");

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 9005, () => {
      console.log(`App is running on PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    app.on("Error", (err) => {
      console.log("ERROr", err);
      throw err;
    });
    console.log("Mongo Db Connection Failed", err);
  });
