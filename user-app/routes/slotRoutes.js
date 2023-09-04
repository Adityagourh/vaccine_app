const express = require('express');
const slot = require('../controller/slotController');

const router = express.Router();

router.get('/available/:id', slot.getAvailableSlots);
router.post('/regisslot', slot.registerSlot);
router.patch('/update', slot.updateSlot);

module.exports = router;