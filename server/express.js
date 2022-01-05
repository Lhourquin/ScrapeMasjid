const express = require("express");
const app = express();
const port = 3000;

let bodyParser = require("body-parser");
const scrapeDataAPI = require("./scrapeDataAPI");
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
//const scrapeDataAPI = require("./scrapeDataAPI");
let city;
let cityInput;
app.get("/mosques", async (req, res) => {
   city = await scrapeDataAPI.getDataAPI(cityInput);

  //console.log(mosques);
  res.send(city);
});

app.post("/mosques", async (req, res) => {
  //console.log(req.body);
  cityInput = await req.body.cityInput;
  console.log(cityInput);
  //res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/mosques`);
});
