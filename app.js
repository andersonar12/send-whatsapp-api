const express = require("express");
const path = require("path");
const whatsAppRoutes = require("./routes/whatsapp.route");
const { initBrowser } = require("./whats-app");

// Si hay error al iniciar el browser, cerrar el proceso de node.
initBrowser().catch((err) => {
  console.log(err);
  process.exit(1);
});

const app = express();
const port = process.env.PORT || 3002;

//CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// serving static files
app.use('/whatsapp', express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use("/whatsapp", whatsAppRoutes);

app.listen(port, () => {
  console.log(`Listen in Port ${port}`);
});
