
const express = require("express");
const connectToMongo = require("./Connection");
const cors = require("cors");
const app = express()
const PORT = 4000;
const userRoute = require('./routes/user')
const cookieParser = require("cookie-parser")
const {restrictToLogin, checkForAuth} = require('./middleware');
const USER = require("./models/users");

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

app.use(
  cors({
    // React app ka URL hai jahan se requests aa rahi hain.
    origin: "http://localhost:5173", 
    // Cookies ko allow karta hai ki frontend aur backend ke 
    // beech mein exchange ho sakein.
    credentials: true, 
  })
);

app.use(checkForAuth)

app.get("/", restrictToLogin(["employee"]) , async (req, res) => {
    const user = await USER.findOne({
        fullname : req.user.fullname
    })
    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }
    res.json(user);
});

app.get("/allUsers", restrictToLogin(["admin"]) ,async (req, res) => {
  const allUsers = await USER.find({ role : "employee"})
  res.json({
    allUsers,
    admin : req.user
  });
});

app.post('/logout', (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ message: 'Logged out successfully' });
});


connectToMongo("mongodb://127.0.0.1:27017/emp_app")
.then(console.log("MongoDB connect"))
.catch((err) => console.log(err))


app.use("/user",userRoute)


app.listen(PORT,()=>{
    console.log("Server is listening to PORT: " + PORT)
})  