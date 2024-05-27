const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();
const prisma = new PrismaClient();

const isSessionValid = (req, res, next) => {
  if (!req.session.user) {
      return res.status(401).send("Not Authorized");
  }
  next();
};

const fetchUserInfo = async (req, res, next) => {
  try {
    const userInfo = await prisma.users.findUnique({
      where: {
        username: req.session.user.username
      }
    });
    if (!userInfo) {
      return res.status(404).json({ error: "User not found" });
    }
    req.userID = userInfo.userID;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

router.get('/getEquipments', async (req, res) => {
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

router.get('/find-schedules', isSessionValid, fetchUserInfo, async (req, res) => {
  try {
    const schedules = await prisma.schedules.findMany({
      where: {
        userID: req.userID
      },
      orderBy: {
        day: 'asc'
      }
    });

    res.status(200).json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.post('/create-schedule', isSessionValid, fetchUserInfo, async (req, res) => {
  try {
    await prisma.schedules.deleteMany({
      where: {
        userID: req.userID,
        day: req.body.day
      }
    });

    const { day, gymID, equipmentIDs } = req.body;

    const newSchedules = equipmentIDs.map(equipmentID => ({
      userID: req.userID,
      day: day,
      gymID: gymID,
      equipmentID: equipmentID
    }));

    await prisma.schedules.createMany({
      data: newSchedules
    });

    console.log("New schedules created");
    res.status(200).json({ message: "Schedules created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get('/getDetailedSchedule', isSessionValid, fetchUserInfo, async (req, res) => {
  try {
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
        userID: req.userID
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
    res.send(weekInfoList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
})

module.exports = router;