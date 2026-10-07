const path = require("path");
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
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/weather", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.json({ temperature: "-5°C", conditions: "Clear skies" });
});
// Ski conditions endpoint (cached for short duration)
app.get("/ski-conditions", (req, res) => {
  res.set("Cache-Control", "max-age=600"); // Cache for 10 minutes
  res.json({ snow: "15 cm", status: "Open" });
});

// Event schedule endpoint (cached for 1 day)
app.get("/events", (req, res) => {
  res.set("Cache-Control", "max-age=86400"); // Cache for 24 hours
  res.json([
    { event: "Snowboarding competition", date: "2024-12-15" },
    { event: "Skiing festival", date: "2024-12-20" },
  ]);
});

// Sensitive user profile endpoint (no cache to protect user data)
app.get("/user/profile", (req, res) => {
  res.set("Cache-Control", "no-store"); // No cache for sensitive user data
  res.json({ username: "skier123", bookings: "Booked for 2024-12-18" });
});

// Booking details endpoint (no cache due to sensitive information)
app.get("/user/booking", (req, res) => {
  res.set("Cache-Control", "no-store"); // No cache for booking data
  res.json({ bookingId: "XYZ123", liftPasses: 4 });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
