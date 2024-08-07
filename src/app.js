import express from "express";
import router from "./router/index.routes.js";
import viewRoutes from "./router/view.routes.js"
import __dirname from "./dirname.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { connectMongoDB } from "./config/mongoDB.config.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import envs from "./config/envs.config.js"
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";




const app = express();

connectMongoDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/static", express.static(__dirname + "/public"));
app.use(express.static("public"));

app.use(cookieParser());

app.use(
  session({
    secret: envs.SECRET_CODE,
    resave: true,
    saveUninitialized: true,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());


app.engine ("handlebars", handlebars.engine());
app.set ("views", __dirname + "/views");
app.set ("view engine", "handlebars");

app.use ("/", viewRoutes)




app.use ("/api", router);




const httpServer = app.listen(envs.PORT, () => {
  console.log(`Server on port ${envs.PORT}`);
});

export const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("New user connected");
});