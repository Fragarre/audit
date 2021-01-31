const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const customerSchema = new Schema({
    Name: {
        type: String,
        trim: true,
    },
    Short: {
        type: String,
        trim: true,
    },
    Nif:{
        type: String,
        trim: true,
    },
    Address: {
        type: String,
        trim: true,
    },
    Place: {
        type: String,
        trim: true,
    }, // municipio
    Province: {
        type: String,
        trim: true,
    },
    Country:{
        type: String,
        trim: true,
    },
    Vat:{
        type: Number,
        trim: true,
    },
    Ret:{
        type: Number,
        trim: true,
    },
    PostalCode: {
        type: String,
        trim: true,
    },
    Logo: {
        type: String,
        trim: true,
    },
    Color: {
        type: String
    },
    Created: {type: Date, default: Date.now()},
    Modified:{type: Date, default: Date.now()}
});
const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;

//#B9FF33
//#33C3FF 
//#BF33FF
//#FF338F 
//#F0FF33
//#FF3361