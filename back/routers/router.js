const router = require('express').Router();
const controller = require('../controllers/controller');

router.route('/list')
    .get(controller.getAll);

router.route('/getOne')
    .get(controller.get);

router.route('/add')
    .post(controller.add);

router.route('/delete/:id')
    .delete(controller.delete);

module.exports = router;
