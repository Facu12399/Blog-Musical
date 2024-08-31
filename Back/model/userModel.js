const db = require('../data/db')
const bcrypt = require('bcrypt')
const { SALT_ROUNDS } = require('../config/config')
const { DataTypes, Op } = require('sequelize')

const userModel = db.define('usuarios', {
  username: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  imageName: { type: DataTypes.STRING}
})

class UserRepository {
  static async create ({ username, password, imageName }) {

    // Me aseguro que el nombre de usuario no existe
    const existingUser = await userModel.findOne({
      where: { username }
    })
    if (existingUser) throw new Error ('username already exist')

    // Verificar si el nombre ya existe en otro usuario
    const existingImage = await userModel.findOne({
      where: {
        imageName
      }
    })

    if (existingImage) {
      throw new Error('Image already exists')
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    userModel.create({
      username,
      password: hashedPassword,
      imageName
    })
  }

  static async login ({ username, password }) {

    const user = await userModel.findOne({ where: { username } })
    if (!user) throw new Error('username does not exist')

    const isValid = await bcrypt.compareSync(password, user.password)
    if (!isValid) throw new Error('password is invalid')

    const { password: _, ...publicUser } = user

    return publicUser
  }

  static async updateUsername ({ id, username }) {
    // Buscar el usuario por ID
    const userToUpdate = await userModel.findByPk(id)

    if (!userToUpdate) {
      throw new Error('User not found')
    }

    // Verificar si el nombre ya existe en otro usuario
    const existingUser = await userModel.findOne({
      where: {
        username,
        id: { [Op.not]: id } // Excluir el usuario actual
      }
    })

    if (existingUser) {
      throw new Error('Username already exists')
    }

    if (username === userToUpdate.username ) throw new Error('Username is same')

    // Actualizar el nombre del usuario
    await userToUpdate.update({ username })
  }

  static async updatePassword({ id, password }) {
    // Buscar el usuario por ID
    const userToUpdate = await userModel.findByPk(id);

    if (!userToUpdate) {
        throw new Error('User not found');
    }

    const isValid = await bcrypt.compareSync(password, userToUpdate.password)
    if (isValid) throw new Error('Password is same')

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Actualizar la contraseña en la base de datos
    await userToUpdate.update({
        password: hashedPassword,
    })
  }

  static async updateImageName ({ id, imageName}) {
    // Buscar el usuario por ID
    const userToUpdate = await userModel.findByPk(id)

    if (!userToUpdate) {
      throw new Error('User not found')
    }

    // Verificar si el nombre ya existe en otro usuario
    const existingUser = await userModel.findOne({
      where: {
        imageName,
        id: { [Op.not]: id } // Excluir el usuario actual
      }
    })

    if (existingUser) {
      throw new Error('Image already exists')
    }

    if ( imageName === userToUpdate.imageName ) throw new Error('Image is same')

    await userToUpdate.update({ 
      imageName: imageName,
      where: { id: id }
    })
  }
}

module.exports = { UserRepository, userModel }