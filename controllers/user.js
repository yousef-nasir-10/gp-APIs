const {User} = require ('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET
const bcrypt = require("bcryptjs") 
var nodemailer = require('nodemailer');



const login = async(req, res) => {
    try {
        const {id, password} = req.body
        console.log(id, password);
        const user = await User.findOne({id})
        if(!user){
            console.log('user does not exist');
            return res.status(200).json({error: 'User does not exist'})

        } 

        if(await bcrypt.compare(password, user.password)){
            const token = jwt.sign(
                {
                    userID: user.id, 
                    role: user.role,
                    id: user._id
                }, 
                    JWT_SECRET,
                    {expiresIn: "60m"}
            )
            console.log(token);
            return res.status(200).json({ status: "OK" ,data: token})

        }else{
            return res.status(200).json({status: "error", error: "Invalid Password"})

        }

    } catch (error) { 
        res.status(500).json({msg: error}) 

    }
}
const verify = async(req, res) => {
    try {
        const {id} = req.body
        console.log(id);
        const user = await User.findOne({id})
        if(!user){
            console.log('user does not exist');
            return res.status(200).json({error: 'User does not exist'})

        } 
            const token = jwt.sign(
                {
                    userID: user.id,
                    role: user.role,
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                }, 
                    JWT_SECRET,
                    {expiresIn: "10080m"}
            )
            return res.status(200).json({ status: "OK" ,data: token})

        

    } catch (error) { 
        res.status(500).json({msg: error}) 

    }
}

const login1 = async(req, res) => {
    try {
        const {id, password} = req.body
        console.log(id, password);
        const user = await User.findOne({id})
        if(!user){
            console.log('user does not exist');
            return res.status(200).json({error: 'User does not exist'})

        } 

        if(await bcrypt.compare(password, user.password)){


            let code = Math.floor(Math.random() * (9999 - 1000) + 1000).toString();

            if(user.id === "TryPurposes@GP.com"){
                code = "1111"
                const token = jwt.sign(
                    {
                        otp: code,
                        id: id
                    }, 
                        JWT_SECRET,
                        {expiresIn: "1m"}
                )
                return res.status(200).json({ status: "OK" ,data: token})

            }else{

                const token = jwt.sign(
                    {
                        otp: code,
                        id: id
                    }, 
                        JWT_SECRET,
                        {expiresIn: "1m"}
                )
                console.log(code);
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.EMAIL_PASSWORD
     
                    } 
                  });
                  
                  var mailOptions = {
                    from: process.env.EMAIL,
                    to: user.email, 
                    subject: 'OTP',
                    html: 
                    `
                        <h1>Welcome ${user.firstName} ${user.lastName}  </h1>
                        <h3> Your OTP is ${code} </h3> 
                        <`, 
                    
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
                  console.log(code);
    
                return res.status(200).json({ status: "OK" ,data: token})
            }
            
            

        }else{
            return res.status(200).json({status: "error", error: "Invalid Password"})

        }

    } catch (error) { 
        console.log(error);
        res.status(500).json({msg: error}) 

    }
}

const register = async (req,res) => {
    const {firstName, lastName, email, password, role, id} = req.body
    const oldUserEmail = User.findOne({email})
    const userId = await User.findOne({id})

    const encryptedPassword = await bcrypt.hash(password, 10)
    // if(!oldUserEmail){
    //     console.log("Email is used");
    //     return res.status(200).json({status: "error", error: "Email is used"})
    // }

    if(userId){
        return res.status(200).json({status: 400, msg: "id is used"})
    }


    console.log(firstName, lastName, password, email, role, id);

    try {
        await User.create({
            firstName,
            lastName,
            email,
            password: encryptedPassword,
            role,
            id
        })
        return res.status(200).json({status: 200, msg: "User created"})
    } catch (error) {
        res.status(500).json({msg: error, status: 500}) 
    }
}

const userData = async (req,res) => {
    const {token} = req.body
    try {
        const user = jwt.verify(token, JWT_SECRET)
        const id = user.id
        User.findOne({id: id}).then(data =>{
            res.status(200).json({status: "ok", data: data})
        }).catch(error =>{
            res.status(200).json({status: "error", data: error})
        })
    } catch (error) {
        
    }
}

const forgetPassword = async(req, res, next) =>{
    const {email} = req.body
    console.log(email);


    // make sure user does exisit in database
    const user = await User.findOne({email})
    if(!user){
        return res.status(200).json({msg: false})
    }

    const secret = JWT_SECRET + user.password
    const payload = {
        email: user.email,
        id: user._id
    }

    const token = jwt.sign(payload, secret, {expiresIn: "15m"} )
    const link = `https://gradution-project-vite.vercel.app/reset-password/${user.id}/${token}`
    console.log(link);

    var transporter = nodemailer.createTransport({ 
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
      });
      
      var mailOptions = {
        from: process.env.EMAIL,
        to: user.email, 
        subject: 'Reset Password',
        html: 
        `
            <h1>Welcome ${user.firstName} ${user.lastName}  </h1>
            <h3> Your onetime rest password link is below: will expire in 15 min </h3>
            <p><a>${link}</a></p>`, 
        text: link
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    res.status(200).json({msg: true})
}

const resetPassword = async(req, res, next) =>{
    const {id, token} = req.params

    // check user exisit 
    const user = await User.findOne({id})
    if(!user){
        return res.status(200).json({msg: false})
    }

    const secret = JWT_SECRET + user.password
    try {
        const payload = jwt.verify(token, secret)
        return res.status(200).json({msg: true})
        
    } catch (error) {
        console.log(error);
        return res.status(404).json({msg: false}) 

    }

}
const resetPassword1 = async(req, res, next) =>{
    const {id, token} = req.params
    console.log(id);
    console.log(token);
    const {password} = req.body
    const encryptedPassword = await bcrypt.hash(password, 10)


    // check user exisit 
    const user = await User.findOne({id})
    if(!user){
        return res.status(200).json({msg: false})
    }

    const secret = JWT_SECRET + user.password
    try {
        const payload = jwt.verify(token, secret)
        user.password = encryptedPassword
        res.status(200).json({msg:true})
        
        console.log(user);
        const user1 = await User.findOneAndUpdate({id: id}, {password: encryptedPassword}, {
            new: true,
            runValidators: true
        })

        console.log(user1);
        if(!user1){
            return res.status(404).json({msg: `No user with id : ${id}}`})

        }
        

    } catch (error) {
        console.log(error);
        return res.status(404).json({msg: false})
    }

}


module.exports = {
    login, login1,verify,  userData, register, forgetPassword, resetPassword1, resetPassword
}