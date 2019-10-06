// import RecordService from '../services/RecordService';
// import Util from '../utils/Utils';

const RecordService = require('../services/RecordService');
const Util = require("../utils/Utils");

const util = new Util();

class RecordController {
  static async getAllRecords(req, res) {
    try {
      const allRecords = await RecordService.getAllRecords();
      if (allRecords.length > 0) {
        util.setSuccess(200, 'Records retrieved', allRecords);
      } else {
        util.setSuccess(200, 'No record found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addRecord(req, res) {
    if (!req.body.title || !req.body.price || !req.body.description) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    const newRecord = req.body;
    try {
      const createdRecord = await RecordService.addRecord(newRecord);
      util.setSuccess(201, 'Record Added!', createdRecord);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedRecord(req, res) {
    const alteredRecord = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updateRecord = await RecordService.updateRecord(id, alteredRecord);
      if (!updateRecord) {
        util.setError(404, `Cannot find record with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Record updated', updateRecord);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getARecord(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const theRecord = await RecordService.getARecord(id);

      if (!theRecord) {
        util.setError(404, `Cannot find record with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found Record', theRecord);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteRecord(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const recordToDelete = await RecordService.deleteRecord(id);

      if (recordToDelete) {
        util.setSuccess(200, 'Record deleted');
      } else {
        util.setError(404, `Record with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

// export default RecordController;
module.exports = RecordController;
