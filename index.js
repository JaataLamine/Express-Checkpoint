const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// Set pug as default template
app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static(path.join(__dirname, "public")));

// Middleware to make the app available during working hours (Monday to Friday, from 9 to 17)
app.use((req, res, next) => {
  const date = new Date("2023-01-17T16:45:30");
  const day = date.getDay();
  const hour = date.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour <= 17) {
    next();
  } else {
    res.render("acces_deny", {
      title: 404,
    });
  }
});

app.get("/", (req, res) => {
  res.render("home", {
    title: "Home",
  });
});

app.get("/services", (req, res) => {
  res.render("services", {
    title: "Services",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact",
  });
});

app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
