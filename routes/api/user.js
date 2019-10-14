// routes/api/user

const router = require("express").Router();
const UserController = require("../../controllers/UserController");
const passport = require("../../config/passport")


//matches with /api/user
router.post('/test', UserController.testWithoutService)
router.post('/register', UserController.findOrCreate)
router.post('/login', passport.authenticate("local"), UserController.userLogin)

// router.post('/login', UserController.)

// router.get('/', RecordController.getAllRecords);
// router.post('/', RecordController.addRecord);
// router.get('/:id', RecordController.getARecord);
// router.put('/:id', RecordController.updatedRecord);
// router.delete('/:id', RecordController.deleteRecord);

// export default router;
module.exports = router;