const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const prisma = new PrismaClient();

const isSessionValid = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).send("Not Authorized");
    }
    next();
};

router.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        await prisma.users.create({
            data: { username, password: hash }
        });
        return res.status(200).send();
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.get("/findUsername", async(req, res)=> {
    try {
        const { username } = req.query;
        const findUsername = await prisma.users.findUnique({
            where: {
                username: username
            }
        });
        res.send(findUsername ? true: false);
    } catch (e) {
        return res.status(500).json({ error: e});
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Login attempt:', req.body);  // Log the request payload
        const findUser = await prisma.users.findUnique({
            where: {
                username: username
            }
        });
        console.log('User found:', findUser);  // Log if user is found
        if (!findUser) {
            return res.status(404).send("User not found");
        }
        const isValidPassword = await bcrypt.compare(password, findUser.password);
        console.log('Password valid:', isValidPassword);  // Log if password is valid
        if (!isValidPassword) {
            return res.status(401).send("Incorrect password");
        }
        if (req.session.user) {
            if (req.session.user.username !== username) {
                req.session.user = null;
                req.session.user = { username: username }
                req.session.save(() => {
                    res.send(username);
                });
            } else {
                res.send("Already logged in");            
            }
        } else {
            req.session.user = { username: username };
            req.session.save(() => {
                res.send("Logged in successfully!");
            })
        }
    } catch (e) {
        console.error('Login error:', e);  // Log any errors
        res.status(500).send("Internal server error");
    }
})


module.exports = router;