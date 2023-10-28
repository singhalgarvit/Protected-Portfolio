const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const bcrypt=require("bcrypt");
const collection = require("./mongodb");

// this is a sample comment for git repo........

const tempelatePath = path.join(__dirname, "../tempelates");
app.use(express.static("public"));

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", tempelatePath);
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup"); 
});



app.post("/signup", async (req, res) => {
  const hashPassword= await bcrypt.hash(req.body.password, 10);
  const data = {
    name: req.body.name,
    username: req.body.username,
    password: hashPassword,
  };

  const checkUser = await collection.findOne({username: req.body.username});
  if (!checkUser) {
    collection.insertMany([data]);
    res.render("home");
  } else {
    res.send("User Already Registered");
  }
});

app.post ("/login", async (req, res) => {
  const check = await collection.findOne({username: req.body.username});
  try {
      const compareHashPassword= await bcrypt.compare(req.body.password, check.password);
      if (compareHashPassword){
        res.render("home");
      } else {
        res.send("Wrong Password");
      }
    } catch {
      res.send("UserName Not Found");
    }
});

app.listen(4000, () => {
  console.log("port connected");
});
