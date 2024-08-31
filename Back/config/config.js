module.exports = {
  PORT: process.env.PORT || 3000,
  SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
  SECRET_JWT_KEY: process.env.SECRET_JWT_KEY || 'this-is-an-awesome-secret-key-very-much-more-large-and-very-sure'
}