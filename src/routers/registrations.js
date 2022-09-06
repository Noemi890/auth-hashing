const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prisma.js')
const saltRounds = 10

router.post('/', async (req, res) => {
    const {username, password } = req.body

    const userExist = await prisma.user.findFirst({
        where: {
            username
        }
    })

    if (username) return res.status(409).json({ error: 'A user with that username already exist' })
    
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const createdUser = await prisma.user.create({
        data: {
            username,
            password: hashedPassword
        }
    })

    // Get the username and password from request body
    
    // Hash the password: https://github.com/kelektiv/node.bcrypt.js#with-promises
    
    // Save the user using the prisma user model, setting their password to the hashed version
    
    // Respond back to the client with the created users username and id
    res.status(201).json({ user: {username: createdUser.username, id: createdUser.id}})
});

module.exports = router;
