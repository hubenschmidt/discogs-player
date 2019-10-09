// routes/api/user

const router = require("express").Router();
const UserController = require("../../controllers/UserController");

//matches with /api/user
router.post('/test', UserController.testWithoutService)
router.post('/', UserController.findOrCreate)

// router.get('/', RecordController.getAllRecords);
// router.post('/', RecordController.addRecord);
// router.get('/:id', RecordController.getARecord);
// router.put('/:id', RecordController.updatedRecord);
// router.delete('/:id', RecordController.deleteRecord);

// export default router;
module.exports = router;