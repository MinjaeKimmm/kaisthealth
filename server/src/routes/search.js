const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
      const gymID = parseInt(req.query.gymID, 10);
      if (isNaN(gymID)) {
        return res.status(400).json({ error: "Invalid gymID" });
      }
      const equipments = await prisma.gymEquipment.findMany({
        where: {
          gymID: gymID
        }
      });
      let equipmentIDList = equipments.map(equipment => equipment.equipmentID);
      res.json(equipmentIDList);
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
});

module.exports = router;