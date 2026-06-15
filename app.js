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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});