const { Schema, model } = require('mongoose');

const ColegioSchema = Schema({
    direccion: {
    type: String,
    required: [true, 'El campo direccion es requerido'],

  },
  latitud: {
    type: Number,
    min:[6.14,'la latitud minima permitida es de 6.14'] ,
    max:[6200,'la latitud maxima permitida es de 6.200'],
    required: [true, 'El campo latitud es requerido'],
  },
  longitud: {
    type: Number,
    max:[-75.43,'la longitud maxima permitida es de -75.43'] ,
    min:[-75.50,'la longitud minima permitida es -75.50'],
    required: [true, 'El campo longitud es requerido'],

  },
    descripcion: {
    type: String,
    required: [true, 'El campo descripcion es requerido'],
  },
    fechaReporte: {
    type:Date,
    default: Date.now
  
  },
});

module.exports = model('Colegio', ColegioSchema);


