const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const prisma = new PrismaClient();

router.get("/isSessionValid", async (req, res) => {
    if (req.session.user) {
      res.send(true);
    } else {
      res.send(false);
    }
});

router.get("/returnUsername", async (req, res) => {
    res.send(req.session.user.username);
});

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
        const findUser = await prisma.users.findUnique({
            where: {
                username: username
            }
        });
        if (!findUser) {
            return res.status(404).send("User not found");
        }
        const isValidPassword = await bcrypt.compare(password, findUser.password);
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
        console.error('Login error:', e);  
        res.status(500).send("Internal server error");
    }
});

router.post("/logout", async(req, res) => {
    req.session.user = null;

    res.end();
})


module.exports = router;