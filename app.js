const express = require("express");
const cors = require("cors");

const phonebookRoutes =
  require("./routes/phonebookRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use(cors());

app.use(
  "/uploads",
  express.static("uploads")
);

app.use(
  "/api/phonebooks",
  phonebookRoutes
);

app.listen(3001, () => {
  console.log("Server Running");
});