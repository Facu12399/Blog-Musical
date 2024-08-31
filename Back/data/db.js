const { Sequelize } = require('sequelize')

const db = new Sequelize('blog_musical', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
})

module.exports = db