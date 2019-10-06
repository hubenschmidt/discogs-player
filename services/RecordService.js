// import database from '../models';

const database = require('../models');

class RecordService {
  static async getAllRecords() {
    try {
      return await database.Record.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addRecord(newRecord) {
    try {
      return await database.Record.create(newRecord);
    } catch (error) {
      throw error;
    }
  }

  static async updateRecord(id, updateRecord) {
    try {
      const RecordToUpdate = await database.Record.findOne({
        where: { id: Number(id) }
      });

      if (RecordToUpdate) {
        await database.Record.update(updateRecord, { where: { id: Number(id) } });

        return updateRecord;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getARecord(id) {
    try {
      const theRecord = await database.Record.findOne({
        where: { id: Number(id) }
      });

      return theRecord;
    } catch (error) {
      throw error;
    }
  }

  static async deleteRecord(id) {
    try {
      const RecordToDelete = await database.Record.findOne({ where: { id: Number(id) } });

      if (RecordToDelete) {
        const deletedRecord = await database.Record.destroy({
          where: { id: Number(id) }
        });
        return deletedRecord;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

// export default RecordService;
module.exports = RecordService;