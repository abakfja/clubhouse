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

// // Cors
const cors = require("cors");

app.use(cors);


const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
const globalErrorHandler = require('./utils/globalerror');
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
