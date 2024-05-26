const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
      console.log("1");
      const schedules = await prisma.schedules.findMany({
        include: {
          Gyms: true,
          Equipment: {
            include: {
              EquipmentTargetArea: {
                include: {
                  BodyParts: true
                }
              }
            }
          }
        },
        where: {
          userID: 4
        },
        orderBy: {
          day: 'asc'
        }
      });
      const weekInfoList = schedules.map(schedule => {
        const targetAreas = schedule.Equipment.EquipmentTargetArea.map(target => target.BodyParts.targetArea);
        const largerBodyPart = schedule.Equipment.EquipmentTargetArea[0].BodyParts.largerBodyPart; // Assuming all target areas have the same larger body part
      
        return {
          day: schedule.day,
          gymName: schedule.Gyms.name,
          equipmentName: schedule.Equipment.name,
          type: schedule.Equipment.type,
          largerBodyPart: largerBodyPart,
          targetArea: targetAreas
        };
      });
      
      res.json(weekInfoList);
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
});

module.exports = router;