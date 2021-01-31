const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const usuarioSchema = new Schema({
  Nombre: {
    type: String,
    trim: true,
  },
  Apellido: {
    type: String,
    trim: true,
  },
  user: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    trim: true,
  },
  Created: {type: Date, default: Date.now()},
  Modified:{type: Date, default: Date.now()}
});

const Usuario = mongoose.model("Usuario", usuarioSchema);
module.exports = Usuario;
