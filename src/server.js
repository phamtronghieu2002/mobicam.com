require('dotenv').config()
const appMiddleware = require("./configs/appMiddleware.js");
const InitApiRoute = require("./route/web.js");
const express = require("express");
const path = require("path");
const { fileURLToPath } = require('url');
const app = express();
const port = process.env.PORT || 3000;

appMiddleware(express, app);
InitApiRoute(app);

app.set("view engine", "ejs");
app.set("views", "./src/views");

//config file upload
//cònig static file
app.use(express.static(path.join(__dirname, "public")));
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
const filesDirectory = path.join(__dirname, 'files');
app.use('/files', express.static(filesDirectory));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

console.log("Server is started !!");
