const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
      const equipments = await prisma.Equipment.findMany({
          include: {
              EquipmentTargetArea: {
                  include: {
                      BodyParts: true
                  }
              }
          }
      });

      
      res.json(equipments);
  } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
  }
});


module.exports = router;