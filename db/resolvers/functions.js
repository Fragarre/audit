const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({
  path: "variables.env",
});

module.exports = {
  CrearToken: async (usuario, secreta, expiresIn) => {
    try {
      const {
        id,
        nombre,
        apellido
      } = usuario;
      const userToken = await jwt.sign({
          id,
          nombre,
          apellido,
        },
        secreta, {
          expiresIn,
        }
      )
      return userToken;
    } catch (error) {
      return error.message;
    }
  },
  CreateRecord: async (model, data) => {
    try {
      const newRecord = new model(data);
      newRecord.save();
      return 'Record Created';
    } catch (error) {
      return error.message;
    }
  },
  ReadAllRecords: async (model) => {
    try {
      let records = await model.find({});
      return records;
    } catch (error) {
      return error.message;
    }
  },
  ReadAllRecordsByField: async (model, field) => {
    try {
      const records = await model.find({
        field
      });
      return records;
    } catch (error) {
      return error.message;
    }
  },
  ReadOneRecord: async (model, field) => {
    try {
      const records = await model.findOne(field);
      return records;
    } catch (error) {
      return error.message;
    }
  },
  UpdateRecord: async (model, lookField, input) => {
    try {
      const record = await model.findOneAndUpdate(lookField, input, {
        new: true
      });
      return 'Updated';
    } catch (error) {
      return error.message;
    }
  },
  DeleteRecord: async (model, idField) => {
    try {
      const record = await model.findByIdAndRemove(idField);
      if (record === null) {
        return ('Does not Exist!')
      } else {
        return ('Removed!')
      }
    } catch (error) {
      return error.message;
    }
  },
  DeleteRecordId: async (model, id) => {
    try {
      const record = await model.findOneAndRemove(model, id);
      if (record === null) {
        return ('Does not Exist!')
      } else {
        return ('Removed!')
      }
    } catch (error) {
      return error.message;
    }
  },
  ResetCounter: async (model, id) => {
    try {
      const reset = await model.counterReset(id)
      return "Counter Reset"
    } catch (error) {
      return error.message
    }
  }
};