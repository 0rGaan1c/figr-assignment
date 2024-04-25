require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connect");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth");
const projectRouter = require("./routes/project");
const componentRouter = require("./routes/component");
const userRouter = require("./routes/user");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", authRouter);
app.use("/api/projects", projectRouter);
app.use("/api/components", componentRouter);
app.use("/api/user", userRouter);

const port = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      port,
      console.log(`DB connected and server is running on port ${port}`)
    );
  } catch (err) {
    console.error(err);
  }
};

startServer();
