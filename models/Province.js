const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const provinceSchema = new Schema({
    Province: {
        type: String,
        trim: true,
    },
    Code: {
        type: String,
        trim: true,
    },
    Created: {type: Date, default: Date.now()},
    Modified:{type: Date, default: Date.now()}
});
const Province = mongoose.model("Province", provinceSchema);
module.exports = Province;