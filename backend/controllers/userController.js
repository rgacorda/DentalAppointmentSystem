const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Import bcrypt
require('dotenv').config();

// __________________JSON_WEB_TOKENS______________________
const maxAge = 3 * 2 * 60 * 60;

const createToken = (id) => {
    console.log("the id is = " + id);
    return jwt.sign({ id }, process.env.JWT_SECRET, { // environment variable for JWT secret
        expiresIn: maxAge,
    });
};

const userController = {
    registerUser: async (req, res) => {
        try {
            const { firstname, middleinitial, lastname, address, password, email, cpnumber } = req.body;
            
            // Hash the password before storing it
            const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds
            
            const user = await db.Users.create({
                firstname,
                middleinitial,
                lastname,
                address,
            });
            
            const account = await db.Accounts.create({
                password: hashedPassword, // Store the hashed password
                email,
                cpnumber,
                role: 'user',
                userId: user.id,
            });
            
            const token = createToken(user.id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(201).send({ message: 'User created', user, account });
        } catch (error) {
            console.error(error);
            if (error.name === 'SequelizeValidationError') {
                res.status(400).send({ message: 'Validation error. Please check your input.' });
            } else if (error.name === 'SequelizeUniqueConstraintError') {
                res.status(400).send({ message: 'Email or CP number is already in use.' });
            } else {
                res.status(500).send({ message: 'There was a problem creating the user.' });
            }
        }
    },
    logoutUser:async (req,res)=>{
        res.cookie("jwt", "", {maxAge:1});
        res.json("logged out successfully")
    },

    updateUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const { firstname, middleinitial, lastname, address, password, email, cpnumber } = req.body;
            const user = await db.Users.findByPk(userId);
            const account = await db.Accounts.findOne({
                where: {
                    userId: userId,
                },
            });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            if (!account) {
                return res.status(404).json({ error: 'Account not found' });
            }
            await user.update({
                firstname,
                middleinitial,
                lastname,
                address,
            });
            await account.update({
                password,
                email,
                cpnumber,
            });
            res.status(200).json({ message: 'User updated', user, account });
        } catch (error) {
            console.error(error);
            if (error.name === 'SequelizeValidationError') {
                res.status(400).send({ message: 'Validation error. Please check your input.' });
            } else {
                res.status(500).send({ message: 'There was a problem updating the user.' });
            }
        }
    },

    deleteUser: async (req, res) => {
        try {
            const userIdToDelete = req.params.id;
            const user = await db.Users.findByPk(userIdToDelete);
            const account = await db.Accounts.findOne({
                where: {
                    userId: userIdToDelete,
                },
            });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            if (!account) {
                return res.status(404).json({ error: 'Account not found' });
            }
            await user.destroy();
            await account.destroy();
            res.status(204).json('Deletion successful');
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There was a problem deleting the user.' });
        }
    },

    getSingleUser: async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await db.Users.findByPk(userId);
            const account = await db.Accounts.findOne({
                where: {
                    userId: userId,
                },
            });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            if (!account) {
                return res.status(404).json({ error: 'Account not found' });
            }
            res.status(200).json({ user, account });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error fetching the user' });
        }
    },

    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const account = await db.Accounts.findOne({
                where: {
                    email: email,
                },
            });
            
            if (!account) {
                return res.status(404).json({ error: 'Account not found' });
            }
            
            // Compare the provided password with the hashed password in the database
            const passwordMatch = await bcrypt.compare(password, account.password);
            
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Incorrect password' });
            }
            
            const user = await db.Users.findByPk(account.userId);
            const token = createToken(user.id);
            
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(200).json({ message: 'Login successful', user, account });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There was a problem logging in' });
        }
    },
};



module.exports = userController;