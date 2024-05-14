// site: home, contact, search, ...
const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.use('/search', siteController.search);
router.use('/', siteController.home); // nó sẽ match tuyến đường từ trên xuống theo thứ tự

module.exports = router;