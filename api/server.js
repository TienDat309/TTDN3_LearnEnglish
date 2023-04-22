require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const app = express();
const server = http.createServer(app);


app.use(express.json());
// app.use(cors())
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use([
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false })
]);
// Routes
app.use("/api", require("./src/users/routers/skillRouter"));
app.use("/api", require("./src/users/routers/grammarRouter"));
app.use("/api", require("./src/users/routers/vocabularyRouter"));
app.use("/api", require("./src/users/routers/ggMeetRouters"));
app.use("/api", require("./src/users/routers/bookmeeting"));
app.use("/api", require("./src/users/routers/payment"));
app.use("/mail", require("./src/users/routers/MailSendRoutes"));
app.use("/user", require("./src/users/routers/userRouter"));
app.use("/admin", require("./src/admin/routers/adminRouter"));
app.use("/admin", require("./src/admin/routers/analysis"));
app.use("/admin", require("./src/admin/routers/upload_Image"));
app.use("/admin", require("./src/admin/routers/createTopicRouter"));

app.use("/api", require("./src/users/routers/typeRoute"));
app.use("/api", require("./src/users/routers/levelRoute"));
app.use("/api", require("./src/users/routers/topicRoute"));

//socket.io
const io = (module.exports.io = require("socket.io")(server, {
  cors: {
      origin: '*',
  }
}));
const socketManager = require("./src/users/config/socketManager");
io.on("connection", socketManager); 

// connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB!");
  }
);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
      res.setHeader('Access-Control-Allow-Credentials', true);
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  })
}

const PORT = process.env.PORT || 5000
server.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
})