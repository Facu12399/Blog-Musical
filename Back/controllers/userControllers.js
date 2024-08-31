const { UserRepository, userModel } = require('../model/userModel')
const jwt = require('jsonwebtoken')
const { SECRET_JWT_KEY } = require('../config/config')
const multer = require('multer')
const path = require('path')
const validateCreate = require('../validators/users')

// Configuración de Multer para imagenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads'); // Ruta absoluta a la carpeta "uploads"
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage });

// Obtener nombre de la imagen
const getImageName = (req, res, next) => {
  // Aquí obtén el nombre de la imagen desde la solicitud
  const imageName = req.file ? req.file.filename : null;
  req.body.imageName = imageName; // Agrega el nombre de la imagen al cuerpo de la solicitud
  next();
};


// Registrar usuario
const register = async (req, res) => {
  const { username, password, imageName } = req.body

  try {
    await UserRepository.create({ username, password, imageName })
    res.json({ message: 'Usuario registrado correctamente', getImageName })
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// Iniciar sesion
const login = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await UserRepository.login({ username, password })
    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_JWT_KEY,
      {
        expiresIn: '1h'
      })
    res
      .cookie('access_token', token, {
        httpOnly: true, // la cookie solo se puede acceder en el servidor
        secure: process.env.NODE_ENV === 'production', // la cookie solo se puede acceder en https
        sameSite: 'strict', // la cookie solo se puede acceder en el mismo dominio
        maxAge: 1000 * 60 * 60 // la cookie tiene un tiempo de validez de 1 hora
      })
      .send({ user, token })
  } catch (error) {
    res.status(401).send(error.message)
  }
}

// Cerrar sesion
const logout = async (req, res) => {
  res
    .clearCookie('access_token')
    .json({ message: 'Logout successful' })
}

// Acceso con token
const accessToken = async (req, res, next) => {
  const token = req.cookies.access_token
  req.session = { user: null }

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY)
    req.session.user = data
  } catch {}

  next() // seguir a la siguiente ruta o middleware
}

// Acceso a la ruta
const access = async (req, res) => {
  const { user } = req.session
  res.render('index', user)
}

// Ir a la ruta protegida
const protect = async (req, res) => {
  const { user } = req.session
  if (!user) return res.status(403).send('Access not authorized')
  res.render('protected', user) // { _id, username}
}

// Traer todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await userModel.findAll()
    res.json(users)
  } catch (error) {
    res.json({ message: error.message })
  }
}

// Traer un usuario
const getUser = async (req, res) => {
  try {
    const user = await userModel.findByPk(req.params.id)
    res.json(user)
  } catch (error) {
    res.json({ message: error.message })
  }
}

// Editar el username del usuario
const updateUsername = async (req, res) => {
  try {
    await UserRepository.updateUsername(req.body, {
      where: { id: req.params.id, username: req.body.username }
    })
    res.json('Usuario actualizado correctamente')
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

// Editar el password del usuario
const updatePassword = async (req, res) => {
  try {
    await UserRepository.updatePassword(req.body, {
      where: { id: req.params.id, password: req.body.password }
    })
    res.json('Has cambiado la contraseña')
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const updateImageName = async (req, res) => {
  try {
    const imageName = req.file.filename
    
    await UserRepository.updateImageName({
      id: req.params.id,
      imageName
    })
    res.json({ message: 'La imagen se actualizo con exito'})
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

const deleteUser = async (req, res) => {
  try {
    await userModel.destroy({
      where: { id: req.params.id }
    })
    res.json('El usuario se ha eliminado con exito')
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

module.exports = { upload, getImageName, register, login, logout, accessToken, access, protect, getUsers, 
  getUser, updateUsername, updatePassword, updateImageName, deleteUser }