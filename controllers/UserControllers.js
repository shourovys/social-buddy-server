const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const User = require ('../models/UserModel');

const UserControllers = {}

UserControllers.logIn= async (req,res)=>{
  const {email,password} = req.body;
  try {
    if ( !email || !password ) res.status(400).json({message:'All input filed not given'})
    
      const existingUser = await User.findOne({email})
      if (!existingUser) res.status(400).json({message:"User does not exists"})

      const isPasswordCorrect = await bcrypt.compare(password,existingUser.password)
      
      if (!isPasswordCorrect) res.status(400).json({message:"invalid password"})

      const token = await jwt.sign({email:existingUser.email, id: existingUser._id,},'test',{expiresIn:'1h'})

      res.status(200).json({userInfo:{
        _id:existingUser._id,
        name:existingUser.name,
        email:existingUser.email
      },token})

  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

UserControllers.sineUp = async (req,res)=>{
  const {name, email, password, confirmPassword, } = req.body;

  try {
    if (!name || !email || !password || !confirmPassword) res.status(400).json({message:'All input filed not given'})
    if (password!==confirmPassword)  res.status(400).json({message:'Passwords are not same'})

    const isExistingUser = await User.findOne({email},{email:1})
    if (isExistingUser) res.status(400).json({message:'User already exists'})

    const hashedPassword = await bcrypt.hash(password, 12)

    const userInfo = await User.create({email,password:hashedPassword,name})

    const token = await jwt.sign({email:userInfo.email, id:userInfo._id},'text',{expiresIn:'1h'})

    res.status(200).json({userInfo:{
      _id:userInfo._id,
      name:userInfo.name,
      email:userInfo.email
    },token})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

module.exports = UserControllers