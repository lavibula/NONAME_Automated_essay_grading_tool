const express = require('express');
const router = express.Router();
const essayController = require('../controllers/essayController');

router.get('/', essayController.getEssays);
router.get('/:id', essayController.getEssayById);
router.post('/', essayController.createEssay);
router.put('/:id', essayController.updateEssay);
router.delete('/:id', essayController.deleteEssay);

module.exports = router;