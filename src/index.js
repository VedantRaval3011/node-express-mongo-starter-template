//Import Required Packages
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require('multer');
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/config");

//Setting up express
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); //middleware for uploads

//Setting up Mongoose 
mongoose.connect(config.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

//Storage (File upload handling)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });


//Routes
const authRoute = require("./routes/auth.route")
const userRoutes = require("./routes/user.route")
app.use("/api",upload.single('profilePicture'), authRoute)
app.use('/api/user', userRoutes);
//Server Listening
const port = config.PORT || 5001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

//Export Server
module.exports = app;
