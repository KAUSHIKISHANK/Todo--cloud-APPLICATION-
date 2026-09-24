const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;
       
        const existingUser = await User.findOne({ email });
         if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
                  })
                }
        
        
            const hashedpassword = await bcrypt.hash(password,10);
             const user = await User.create({name, 
            email, 
            password: hashedpassword});
        console.log(name);
        console.log(email);
        console.log(password);
        res.status(200).json({
            success:true,
            message:"Register API Working",
            user
        })
    }

    catch (err) {
    console.log("REGISTER ERROR:", err);

    return res.status(500).json({
        success: false,
        message: err.message
    });
}
}

async function loginUser(req,res){
    try{
        const {password,email} = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        const token = jwt.sign(
    {
        id: user._id,
        email: user.email
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "24h"
    }
);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

  
        return res.status(200).json({
    success: true,
    message: "Login Successful",
    token,
    user: {
        id: user._id,
        name: user.name,
        email: user.email
    }
});
    
     
    }
    

    catch (err) {

        console.log(err);

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

}

module.exports = {
    registerUser,
    loginUser
};


    




