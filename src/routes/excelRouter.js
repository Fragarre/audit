const router = require('express').Router();
const excelController = require('../controllers/excelController');

router
.get('/getfile', excelController.getExcelDoc)
.post('/downloadExcel', excelController.saveWithExcel)
module.exports = router;