const thu_muc_cau_hoi = require("../models/Thu_muc_cau_hoi");

class SiteController {

    // [GET] /
  
    async home(req, res) {
        try {
            const thu_muc_cau_hoi_s = await thu_muc_cau_hoi.find({});
            res.json(thu_muc_cau_hoi_s);
        } catch (err) {
            console.error(err);
            res.status(400).json({ error: 'ERROR!' });
        }
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
