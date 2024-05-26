const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
      const newSchedule = await prisma.schedules.create({
        data: {
          userID: 4,
          day: "Monday",
          gymID: 1,
          equipmentID: 1
        }
      });
      console.log("Successfully created");
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
});

module.exports = router;