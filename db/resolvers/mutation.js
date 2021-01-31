const functions = require("./functions");
const Usuario = require("../../models/Usuario");
const CertificationRule = require("../../models/CertificationRule");
const ScheduleItem = require('../../models/ScheduleItem');
const Customer = require('../../models/Customer');
const EndClient = require('../../models/EndClient');
const EventType = require('../../models/EventType');
const Province = require('../../models/Province');
const bcrypt = require("bcrypt");
require("dotenv").config({
  path: "variables.env",
});
const jwt = require("jsonwebtoken");
const { findOne } = require("../../models/Usuario");

const mutation = {
  Mutation: {
    autenticarUsuario: async (_, {
      input
    }, ctx) => {
      const {
        user,
        password
      } = input;
      const searchField = {
        user: user
      }
      // existe Usuario ?
      const existeUsuario = await functions.ReadOneRecord(Usuario, searchField)
      if (!existeUsuario) {
        throw new Error('Wrong user or password')
      }
      // password right ?
      const passwordRight = await bcrypt.compare(password, existeUsuario.password)
      if (!passwordRight) {
        throw new Error('Wrong user or password')
      }
      // create token
      const result = await functions.CrearToken(existeUsuario, process.env.SECRETA, '24h')
      return (result)
    },
    nuevoUsuario: async (_, {
      input
    }) => {
      const {
        password
      } = input;
      const salt = 10;
      input.password = await bcrypt.hash(password, salt);
      const result = await functions.CreateRecord(Usuario, input);
      return result;
    },
    newScheduleItem: async (_, {input}) => {
      const result = await functions.CreateRecord(ScheduleItem, input);
      return result
    },
    updateScheduleItem: async(_, {Ident, input}) => {
      const result = await functions.UpdateRecord(ScheduleItem, {Ident: Ident}, input);
      return result;
    },
    deleteScheduleItem: async(_, {Id}) => {
      const result = await functions.DeleteRecordId (ScheduleItem, {Id: Id});
      return result;
    },
    newCertificationRule: async (_, {input}) => {
      const result = await functions.CreateRecord(CertificationRule, input);
      return result
    },
    editCertificationRule: async (_, {id, input}) => {
      const result = await functions.UpdateRecord(CertificationRule, {_id: id}, input);
      return result
    },
    deleteCertificationRule: async(_, {id}) => {
      const result = await functions.DeleteRecord(CertificationRule, id);
      return result;
    },
    newCustomer: async (_, {input}) => {
      const result = await functions.CreateRecord(Customer, input);
      return result
    },
    editCustomer: async (_, {id, input}) => {
      const result = await functions.UpdateRecord(Customer, {_id: id}, input);
      return result
    },
    deleteCustomer: async(_, {id}) => {
      const result = await functions.DeleteRecord(Customer, id);
      return result;
    },
    newEndClient: async (_, {input}) => {
      const result = await functions.CreateRecord(EndClient, input);
      return result
    },
    editEndClient: async(_, {id, input}) => {
      const result = await functions.UpdateRecord(EndClient, {_id: id}, input);
      return result
    },
    deleteEndClient: async(_, {id}) => {
      const result = await functions.DeleteRecord(EndClient, id);
      return result;
    },
    newEventType: async (_, {input}) => {
      const result = await functions.CreateRecord(EventType, input);
      return result
    },
    editEventType: async(_, {id, input}) => {
      const result = await functions.UpdateRecord(EventType, {_id: id}, input);
      return result
    },
    deleteEventType: async(_, {id}) => {
      const result = await functions.DeleteRecord(EventType, id);
      return result;
    },
    newProvince: async (_, {input}) => {
      const result = await functions.CreateRecord(Province, input);
      return result
    },
    resetCounter: async (_, {Id}) => {
      const result = await functions.ResetCounter(ScheduleItem, Id);
      return result
    }
  }
};
module.exports = mutation;