const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
const scheduleSchema = new Schema({
    Subject: {
        type: String,
        trim: true,
        default: ''
    }, // Customer
    Description: {
        type: String,
        trim: true,
        default: ''
    }, //Comments
    StartTime: {
        type: Date
    },
    EndTime: {
        type: Date
    },
    InitialTime: {
        type: String,
        trim: true,
        default: ''
    },
    IsAllDay: {
        type: Boolean,
        default: false
    },
    EndClient: {
        type: String,
        trim: true,
        default: ''
    },
    EventType: {
        type: String,
        trim: true,
        default: "Previsto"
    },
    CertRule: {
        type: String,
        trim: true,
        default: ''
    },
    OtherRevenues: {
        type: Number,
        trim: true,
        default: 0
    },
    AuditRevenues: {
        type: Number,
        trim: true,
        default: 0
    },
    Province: {
        type: String,
        trim: true,
        default: ''
    },
    Parte: {
        type: Boolean,
        default: false,
    },
    Valid: {
        type: Date
    },
    Created: {type: Date, default: Date.now()},
    Modified:{type: Date, default: Date.now()}   
});

scheduleSchema.plugin(AutoIncrement, {inc_field: 'Id'})
const ScheduleItem = mongoose.model("ScheduleItem", scheduleSchema);
module.exports = ScheduleItem;