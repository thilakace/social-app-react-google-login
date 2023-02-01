const jwt = require("jsonwebtoken");
const config = process.env;


const verifyToken = (req, res, next) => {
    try { 
      var token = req.headers.authorization;

      if (req.headers.authorization == undefined) {
        res.status(200).send({ status: 'error', message: 'Unauthorized! Access Token is missing!' });
        return next(res);
         
      }else{
        var token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        console.log(decoded);
        return next();
      }
    } catch (error) {
      res.status(200).send({ status: 'error', message: 'Unauthorized! Access Token was expired!' });
      return next(res);
    }  
     
    
}

module.exports = verifyToken;