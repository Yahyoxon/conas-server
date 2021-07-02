const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require("dotenv").config();
const multer = require("multer");
const path = require("path");
const bodyParser = require('body-parser')

const i18next = require('i18next')
const Backend = require('i18next-fs-backend')
const middleware = require('i18next-http-middleware')

i18next.use(Backend).use(middleware.LanguageDetector)
.init({
  fallbackLng:'en',
  backend:{
    loadPath:'./locales/{{lng}}/translation.json'
  }
})

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(middleware.handle(i18next))
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

const PORT = process.env.PORT || 5000;
console.log('Server is starting......')
app.listen(PORT, () => console.log(`Server started on port:${PORT}`))

app.use("/articles", require("./routes/articleRouter"));
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));

app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.connect(process.env.MONGODB_CONNECTION_STRING,
  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex:true,   
       useFindAndModify:true

  },
  err => {
      if (err) throw err;
      console.log('Database connected..');
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/images/", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

