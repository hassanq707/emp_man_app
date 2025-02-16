const { getUser } = require('./service/token');

function checkForAuth(req, res, next) {

    const { token } = req.cookies;

    console.log(token)

    if (!token) return next()

    const user = getUser(token);

    if (!user)  return next()

    req.user = user;

    return next();

}

function restrictToLogin(roles = []) {

    return function(req,res,next){

    if(!req.user) return res.status(401).json({ message: "Login first" }); 
        
    if(!roles.includes(req.user.role)) return res.status(401).json({ message: "Unauthorized" });

    return next();
    
}}

module.exports = { restrictToLogin ,checkForAuth };


    // if(req.user.role == "admin") return res.json({role : "admin"})

    // const { token } = req.cookies;

    // if (!token) {
    //     return res.status(401).json({ message: "Token not provided" });
    // }

    // const user = getUser(token);

    // if (!user) {
    //     return res.status(401).json({ message: "Invalid token or user" });
    // }
    
    // req.user = user;
