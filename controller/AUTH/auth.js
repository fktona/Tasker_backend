const bcrypt = require('bcryptjs');
// const { Op } = require('sequelize');
const db = require("../../models");
const config = require('../../config/authConfig');
const User = db.user;
const Role = db.role;

const register = async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body;
    const requiredFields = ['firstname', 'lastname', 'email', 'password'];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length) {
        return res.status(400).json({
            message: `Missing ${missingFields} in the request body`
        });
    }

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return re.test(password);
    };

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (!emailError) {
        return res.status(400).json({
            message: "Invalid email format"
        });
    }

    if (!passwordError) {
        return res.status(400).json({
            message: "Password must be at least 6 characters long, contain a special character, an uppercase letter, and a lowercase letter"
        });
    }

    try {
        // Check if the email already exists in the database
        const existingUser = await User.findOne({email })
        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }else{
            console.log('no user found')
        

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashedPassword,
            verification: false
        });

        const userRole = await Role.find({
            where: {
                name: { $in: req.body.roles }
            }
        });

        // await user.setRoles(userRole);
        // res.status(200).json({
        //     message: "User registered successfully",
        // });
        next()

   } } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error registering user"
        });
    }
  
}

module.exports = {
    register
};
