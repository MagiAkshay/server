const express = require('express');
const UsersData = require("../models/Users");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { name, email, phoneNumber, gender, password, confirmpassword } = req.body;
    
        const isUserExist = await UsersData.findOne({ email });
        if (isUserExist) {
          return res.status(400).json({ message: 'User already exists' });
        }
    
        if (password !== confirmpassword) {
          return res.status(400).json({ message: 'Passwords do not match' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Adding new user
        const newUser = new UsersData({
          name,
          email,
          phoneNumber,
          gender,
          password: hashedPassword,
          confirmpassword:password
        });
    
        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully' });
      } catch (e) {
        console.log('./signup', e);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUserExist = await UsersData.findOne({ email });
        if (isUserExist) {
          return res.status(200).json({ message: 'login succesfull' });
        }else{
            return res.status(404).json({ message: 'Not found'});
        }
    
    // Additional login logic here
  } catch (e) {
    console.log('./login', e);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;