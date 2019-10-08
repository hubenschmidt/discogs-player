const router = require("express").Router();
const User = require("../controllers/UserController");

//matches with /api/user
router.post('/', (req, res) => {
    console.log('user signup')
    const { username, password } = req.body;



})

// router.get('/', RecordController.getAllRecords);
// router.post('/', RecordController.addRecord);
// router.get('/:id', RecordController.getARecord);
// router.put('/:id', RecordController.updatedRecord);
// router.delete('/:id', RecordController.deleteRecord);

// export default router;
module.exports = router;