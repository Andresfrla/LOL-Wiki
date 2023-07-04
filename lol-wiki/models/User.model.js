const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'El campo email es obligatorio.']
  },
  password: {
    type: String,
    required: [true, 'El campo password es obligatorio.'],
    minlength: [8, 'La contraseña debe tener al menos 8 caracteres.'],
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,])[A-Za-z\d@$!%*?&.,]+$/,
      'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial.'
    ]
  },
  username: {
    type: String,
    required: [true, 'El campo username es obligatorio.'],
    minlength: [4, 'El nombre de usuario debe tener al menos 4 caracteres.']
  }
});


const User = mongoose.model('User', userSchema);

module.exports = User;

