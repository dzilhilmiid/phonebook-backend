const express = require("express");
const cors = require("cors");
const fs = require("fs");

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

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

const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server Running on port ${PORT}`);
});