// Express
const express = require("express");
const app = express();

// Mongoose
const mongoose = require("mongoose");
const config = require("config");

const dbConfig = config.get("dbConfig");
const uri = `mongodb+srv://${dbConfig.user}:${dbConfig.password}@master.kuwlw.mongodb.net/${dbConfig.dbName}?retryWrites=true&w=majority`;

(async () =>
  await mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    () => console.log("connected")
  ))();

// Cors
const cors = require("cors");

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Routes
app.get("/", async (req, res) => {
  return res.status(200).json({
    suc: true,
    msg: "Welcome",
  });
});

const userRoutes = require('./routes/user');
const clubRoutes = require('./routes/club');
const eventRoutes = require('./routes/event');
const authRoutes = require('./routes/auth');

app.use("/api/user", userRoutes);
app.use("/api/club", clubRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/auth", authRoutes);


// No routes found or errors
const globalErrorHandler = require('./utils/globalError');
const AppError = require('./utils/AppError');

app.all('*', (req, res, next) =>
	next(new AppError(`Unable to find ${req.originalUrl} on the server.`, 404))
);

app.use(globalErrorHandler);

// Start server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
