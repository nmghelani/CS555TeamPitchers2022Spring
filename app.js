const express = require("express");
const configRoutes = require("./routes");
const { engine } = require("express-handlebars");
const app = express();

app.use("/public", express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

configRoutes(app);
app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
