const express = require("express");
const helmet = require("helmet");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());

app.use(
  "/static",
  express.static("public", {
    setHeaders: (res, path) => {
      if (path.endsWith(".css")) {
        res.set("Cache-Control", "max-age=86400");
        // res.set("Cache-Control", "no-store")
      }
      if (path.endsWith(".jpg") || path.endsWith(".png")) {
        res.set("Cache-Control", "max-age=2592000");
      }
    },
  }),
);

app.get("/", (req, res) => {
  res.send("Welcome to Yamnuska Mountain Resort!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
