const functions = require('./functions')
const Usuario = require('../../models/Usuario')
const ScheduleItem = require('../../models/ScheduleItem')
const CertificationRule = require("../../models/CertificationRule");
const Customer = require("../../models/Customer");
const EndClient = require("../../models/EndClient")
const EventType = require("../../models/EventType")
const Province = require("../../models/Province")

const query = {
  Query: {
    getUsuarios: async () => {
      const result = await functions.ReadAllRecords(Usuario);
      return result;
    },
    getScheduleItems: async () => {
      const result = await functions.ReadAllRecords(ScheduleItem);
      return result
    },
    getCertificationRules: async () => {
      const result = await functions.ReadAllRecords(CertificationRule);
      return result;
    },
    getCustomers: async () => {
      const result = await functions.ReadAllRecords(Customer);
      return result;
    },
    getEndClients: async () => {
      const result = await functions.ReadAllRecords(EndClient);
      return result;
    },
    getEventTypes: async () => {
      const result = await functions.ReadAllRecords(EventType);
      return result;
    },
    getProvinces: async () => {
      const result = await functions.ReadAllRecords(Province);
      return result;
    },
    getSchedForecast: async () => {
      const result = await functions.ReadAllRecords(ScheduleItem);
      return result;
    },
    getForecastData: async () => {
      let forecast = []
      const result = await functions.ReadAllRecords(ScheduleItem);
      result.forEach(item => {
        forecast.push({
          Month: new Date(+item.StartTime).getMonth() + 1,
          EventType: item.EventType,
          Subject: item.Subject,
          EndClient: item.EndClient,
          CertRule: item.CertRule,
          AuditRevenues: item.AuditRevenues,
          OtherRevenues: item.OtherRevenues
        });
      })
      return forecast;
    },
    getExcelData: async () => {
      let excelData = []
      const result = await functions.ReadAllRecords(ScheduleItem);
      result.forEach(item => {
        excelData.push({
          StartTime: new Date(+item.StartTime).toISOString(),
          Subject: item.Subject,
          Province: item.Province,
          Parte: item.Parte,
          EndClient: item.EndClient,
          InitialTime: item.InitialTime,
          EventType: item.EventType,
          CertRule: item.CertRule,
          Description: item.Description,
        });
      })
      return excelData;
    }
  }
};
module.exports = query;