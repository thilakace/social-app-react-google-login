const jwt = require('jsonwebtoken');
const User = require('../model/User');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);


const addUser = async (req, res, next) => {
    try {
      const {name, email, password} = req.body;
    
      // validate user input
      if (!(name && email && password )) {
        return res.status(400).send("All inputs are required");
      }

      // check if user already exist
      const userExist = await User.findOne(email);
      if (userExist.length !=0) {
        return res.send("User already exist");
      }
      
      var encryptedPassword  = bcrypt.hashSync(password, salt);

      // create user
      var userReq = {name : name, email:email, password :encryptedPassword };
      User.create(userReq,function(err, content){
        if(err) throw err;
        if(content.insertId){
          console.log("User successfully added.");

          // generate token
          const token = jwt.sign(
            { user_id : content.insertId, email },
            process.env.TOKEN_KEY,
            { expiresIn : "20m"}
          )
          var response = {message:"User successfully added.",token:token};
          return res.send(response);

        } 
        
     });

     
      
    } catch(e){
      console.log(e.message)
    }
}

const getAllUsers = async (req, res, next) => {
    try { 
      const users = await User.getList();
      return res.send(users);
      
      
    } catch (error) {
      return res.status(401).send(error);
    }
}

const getUserInfo = async (req, res, next) => {
  try { 
    const users = await User.getList();
    return res.send(users);
    
    
  } catch (error) {
    return res.status(401).send(error);
  }
}

module.exports = {addUser, getAllUsers, getUserInfo};