const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const endClientSchema = new Schema({
    Client: {
        type: String,
        trim: true,
    },
    Kilometers: {
        type: Number,
        trim: true,
    },
    Certificates: [{
        rule: {
            type: String
        },
        ValidTill: {
            type: String
        }
    }],
    Created: {
        type: Date,
        default: Date.now()
    },
    Modified: {
        type: Date,
        default: Date.now()
    }
});
const EndClient = mongoose.model("EndClient", endClientSchema);
module.exports = EndClient;