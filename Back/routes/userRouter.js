const express = require('express')

// controladores
const { upload, getImageName, register, login, logout, accessToken, access, protect, getUsers, getUser, updateUsername, 
    updatePassword, updateImageName, deleteUser} = require('../controllers/userControllers')
const { validateCreate, validateUpdateUsername, validateUpdatePass, validateUpdateImageName } = require('../validators/users')

// configuracion de rutas express // metodos de HTTP
const router = express.Router()

router.post('/register', upload.single('imageName'), getImageName, validateCreate, register)
router.post('/login', login)
router.post('/logout', logout)
router.get(accessToken)
router.get('/', access)
router.get('/protected', protect)
router.get('/usuarios', getUsers)
router.get('/usuarios/:id', getUser)
router.put('/usuarios/:id', validateUpdateUsername, updateUsername)
router.put('/usuariosPass/:id', validateUpdatePass, updatePassword)
router.put('/usuariosImage/:id', upload.single('imageName') , getImageName, validateUpdateImageName, updateImageName)
router.delete('/usuarios/:id', deleteUser)

module.exports = router