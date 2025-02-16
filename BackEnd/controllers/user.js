const USER = require("../models/users");
const bcrypt = require("bcrypt");
const { setUser } = require("../service/token");

async function handleSignup(req, res) {
    try {
        const { fullname, email, password } = req.body;

        const hashPassword = await bcrypt.hash(password, 10);

        await USER.create({
            fullname,
            email,
            password: hashPassword,
        });

        res.redirect(307, '/user/login'); 
    } catch (error) {
        console.error("Signup Error:", error); 
        res.status(500).json({ error: "Signup failed. Please try again." });
    }
}

async function handleLogin(req,res){


    const {email,password} = req.body;

    const user = await USER.findOne({email})

    if(!user) return res.status(400).json({ message : "Username or password incorrect"})

    const matchPassord = await bcrypt.compare(password,user.password)

    if(!matchPassord) return res.status(400).json({ message : "Username or password incorrect"})
        
    const token = setUser(user)
    
    res.status(200).cookie("token", token, {
        httpOnly: true,
        secure: true,     
        sameSite: "None", 
        maxAge: 7 * 24 * 60 * 60 * 1000, // ✅ Cookie 7 din tak rahegi
      });
      
    res.json(user)

}

module.exports = {
    handleSignup,
    handleLogin,
}