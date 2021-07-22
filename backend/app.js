// Express
const express = require('express');
const app = express();

// Mongoose
const mongoose = require('mongoose');
const config = require('config');

const dbConfig = config.get('dbConfig');
const uri = `mongodb+srv://${dbConfig.user}:${dbConfig.password}@master.kuwlw.mongodb.net/${dbConfig.dbName}?retryWrites=true&w=majority`;

(async () =>
  await mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    },
    () => console.log('connected')
  ))();

// Cors
const cors = require('cors');

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Routes
app.get('/', async (req, res) => {
  return res.status(200).json({
    suc: true,
    msg: 'Welcome',
  });
});

const userRoutes = require('./routes/user');
const clubRoutes = require('./routes/club');
const eventRoutes = require('./routes/event');
const authRoutes = require('./routes/auth');

app.use('/api/users', userRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/auth', authRoutes);

// Error Handling
const error = require('./middlewares/error');
const {ClientError} = require('./utils/error');

app.all('*', (req, res, next) =>
  next(new ClientError(`Unable to find ${req.originalUrl} on the server.`, 404))
);

app.use(error.logErrors);
app.use(error.errorHandler);

// Start server
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
