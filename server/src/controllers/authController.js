const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { use } = require('../routes/authRoutes');

const maxAge = 3 * 24 * 60 * 60;

const signup = async (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body;

    try {
         // check if email already exists
        const user = await User.findOne({ email });
        if(user) throw new Error('the email is already registered');

        // if the user does not exist, save it in the database
        const newUser = await User.create({ 
            firstName,
            lastName,
            email,
            phone,
            password
        });
        
        const token = jwt.sign({_id: newUser._id.toString()}, process.env.JWT_SECRET);
        res.cookie('jwt', token, { httpOnly: false, maxAge: maxAge * 1000, secure: false, overwrite: true });
        res.status(201).json({ user: newUser._id.toString()});
    } catch(err) {
        console.log(err)
        res.status(400).json({ message: err.message});
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email });
        if(user){
            const matches = await bcrypt.compare(password, user.password);
            if(!matches) {
                throw new Error('The password is incorrect');;
            }
        } else {
            throw new Error('The email is incorrect');
        }

        const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET);
        res.cookie('jwt', token, { httpOnly: false, maxAge: maxAge * 1000, secure: false, overwrite: true });
        res.status(201).json({ user: user._id.toString()});
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
}

const logout = async (req, res) => {
    try{
        res.clearCookie("jwt");        
        res.status(200).json({ message: "Logout done"});
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    signup,
    login,
    logout
}