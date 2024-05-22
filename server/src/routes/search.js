const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
      const equipment = await prisma.equipment.findMany();
      res.json(equipment);
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
});

module.exports = router;