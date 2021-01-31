const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cetificationRuleSchema = new Schema({
    CertRule: {
        type: String,
        trim: true,
    },
    Created: {type: Date, default: Date.now()},
    Modified:{type: Date, default: Date.now()}
});
const CetificationRule = mongoose.model("CetificationRule", cetificationRuleSchema);
module.exports = CetificationRule