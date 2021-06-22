const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors);

const password = process.env.ATLASPASSWORD || "EjBUcLdZIOFwnUYr";

const uri =
    `mongodb+srv://superuser:${password}@master.kuwlw.mongodb.net/clubhouse?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`server at http://localhost:${port}`);
});
