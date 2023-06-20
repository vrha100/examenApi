const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.log('Error en la conexión a la base de datos');
    throw new Error('Error conectando a la base de datos');
  }
};

module.exports = { dbConnection };