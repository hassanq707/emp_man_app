const jwt = require("jsonwebtoken")
const secret_key = "qadribhai"

function setUser(user){
    return jwt.sign({
        fullname : user.fullname,
        role : user.role
    },secret_key)
}


function getUser(token) {
    try {
        return jwt.verify(token, secret_key);
    } catch (err) {
        console.log("Invalid token", err);
        return null;
    }
}


module.exports = {
    setUser,
    getUser
}