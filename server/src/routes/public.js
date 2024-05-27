const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();
const prisma = new PrismaClient();

router.get('/getEquipments', async (req, res) => {
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
        const equipmentList = equipments.map(equipment => {
            if (!equipment.EquipmentTargetArea || equipment.EquipmentTargetArea.length === 0) {
                return {
                    equipmentName: equipment.name,
                    type: equipment.type,
                    largerBodyPart: null,
                    targetArea: []
                };
            }

            const targetAreas = equipment.EquipmentTargetArea.map(target => target.BodyParts.targetArea);
            const largerBodyPart = equipment.EquipmentTargetArea[0].BodyParts.largerBodyPart;

            return {
                equipmentName: equipment.name,
                type: equipment.type,
                largerBodyPart: largerBodyPart,
                targetArea: targetAreas
            };
        });

        res.json(equipmentList);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

router.get("/getGym", async (req, res) => {
    try {
      const equipments = await prisma.gymEquipment.findMany({
        include: {
          Equipment: true
        },
        where: {
            gymID: parseInt(req.query.gymID, 10) 
        }
      });
      
      gym = equipments.map(equipment => equipment.Equipment.name);
      res.json(gym);
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
});


module.exports = router;