const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());
const cors = require("cors");
app.use(cors());

const notesRouter = require("./routes/notesRoutes");

app.use("/notes", notesRouter);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Port
var PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
