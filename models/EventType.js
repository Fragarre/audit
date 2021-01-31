const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const eventTypeSchema = new Schema({
    EventType: {
        type: String,
        trim: true,
    },
    Code:  {
        type: String,
        trim: true,
    },
    Created: {type: Date, default: Date.now()},
    Modified:{type: Date, default: Date.now()}
});
const EventType = mongoose.model("EventType", eventTypeSchema);
module.exports = EventType;