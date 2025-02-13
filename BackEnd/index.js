require('dotenv').config()

const express = require("express");
const connectToMongo = require("./Connection");
const cors = require("cors");
const app = express()
const userRoute = require('./routes/user')
const cookieParser = require("cookie-parser")
const {restrictToLogin, checkForAuth} = require('./middleware');
const USER = require("./models/users");

const PORT = process.env.PORT || 4000;

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())


const FRONTEND_URL = process.env.FRONTEND_URL || "https://emp-man-app.vercel.app"; // Set the correct URL of your frontend.

app.use(
  cors({
    origin: FRONTEND_URL, // Allow your frontend domain
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
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


connectToMongo(process.env.DB_URL)
.then(console.log("MongoDB connect"))
.catch((err) => console.log(err))


app.use("/user",userRoute)


app.listen(PORT,()=>{
    console.log("Server is listening to PORT: " + PORT)
})  