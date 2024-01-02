const jwt = require("jsonwebtoken");
const secret = "caffe-web";

async function authentication(req, res, next) {
  try {
    const headers = req.headers;
    const bearer = headers.authorization;
    // console.log("ambil token")

    if (bearer) {
      // console.log("token ada")
      const token = bearer.slice(7);
      console.log(token);

      const decodedToken = jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          console.error(err);
          return res.status(401).json("Error verifikasi token!");
        } else {
          //Jika inputan Token JWT valid
          console.log("Decoded token:", decoded);
          req.userId = decoded.id;
          req.email = decoded.email;
          next();
        }
      });
    } else {
      return res.status(401).json("Token tidak valid!");
    }
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
