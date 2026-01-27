var express = require("express");
var cors = require("cors");
var path = require("path");
const cookieParser = require('cookie-parser'); 

require("dotenv").config();

var prisma = require("./src/lib/prisma")

var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

var homeRouter = require("./src/routes/public/home");
var adminRouter = require("./src/routes/admin/admin");
var publicImoveisRouter = require("./src/routes/public/imoveis");


app.use(cors({
  origin: 'http://localhost:5173', // URL do seu React
  credentials: true // PERMITE RECEBER COOKIES
}));

app.use("/", homeRouter);
app.use("/imoveis", publicImoveisRouter);
app.use("/admin", adminRouter);

app.listen(PORTA_APP, function () {
    console.log(`Rodando na porta ${PORTA_APP}`);
});



