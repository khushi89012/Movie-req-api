require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");


// Generate a new token for the user
const newToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET);
};


//  Register a new token for the user
const register = async function(req, res) {
    try {
        var user = await User.findOne({ email : req.body.email }).lean().exec();

        if(user) 
            return res.status(400).send({message : "Email already Exists"});

        user = await User.create(req.body);

        const token = newToken(user);

        

        res.send({ user, token });
        console.log(user, token)
    } catch (err) {
        res.status(500).send({message : err.message});
        console.log(err)
    }
};

//  Login code for the user

    const login = async(req, res) => {
        try {
            const user = await User.findOne({email : req.body.email });

            if(!user) 
                return res.status(500).send({ message: "Emails not found Please login first." });

            const match = user.checkPassword(req.body.password)

            if(!match) 
                return res.status(500).send({ message: "Please Enter Correct password" });

            const token = newToken(user);

            res.send({user, token});
        }
        catch(e){
            res.status(500).send({ message: err.message })
        }
    }
    module.exports = { register, login}
