// Importar paquetes requeridos de node
const { response } = require('express');
//const bcrypt = require('bcrypt') //encriptar IMPORTAR EL PAQUETE

// Importacion de los modelos
const Colegio = require('../models/colegio');

// Consultar
const colegioGet = async (req, res = response) => {
  const { Direccion } = req.query;

  try {
    const colegios = await Colegio.find();
    res.json({
      colegios
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Ocurrió un error al consultar los colegios'
    });
  }
};

const colegioPost = async (req, res = response) => {
  const body = req.body;

  try {
    const colegio = new Colegio(body);
    await colegio.save();

    res.json({
      msg: 'La inserción se realizó exitosamente'
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map(val => val.message);
      console.error(errorMessages);
      res.status(400).json({
        msg: errorMessages
      });
    } else {
      console.error(error);
      res.status(500).json({
        msg: 'Ocurrió un error al insertar el colegio'
      });
    }
  }
};

const colegioPut = async (req, res = response) => {
  const { direccion, latitud, longitud, descripcion } = req.body;

  try {
    await Colegio.findOneAndUpdate(
      { direccion: direccion },
      { latitud: latitud, longitud: longitud, descripcion: descripcion }
    );

    res.json({
      msg: 'La modificación se efectuó correctamente'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Ocurrió un error al modificar el colegio'
    });
  }
};

const colegioDelete = async (req, res = response) => {
  const { _id } = req.body;

  try {
    await Colegio.deleteOne({ _id: _id });

    res.json({
      msg: 'La eliminación se efectuó correctamente'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Ocurrió un error al eliminar el colegio'
    });
  }
};

module.exports = {
  colegioGet,
  colegioPost,
  colegioPut,
  colegioDelete
};