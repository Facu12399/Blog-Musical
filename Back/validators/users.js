const { check, validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
    try {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            console.log('errores de validación', errores.array());
            return res.status(422).json({ errores: errores.array() });
        }
        next();
    } catch (error) {
        // Manejo de errores específicos si es necesario
        console.error('Error en la validación:', error);
        return res.status(500).json({ mensaje: 'Error interno del servidor' })
    }
};

const validateCreate = [
    check('username')
    .exists()
    .isString()
    .withMessage('username must be a string')
    .isLength({min:3})
    .withMessage('username must be at least 3 characters long'),
    check('password')
    .exists().withMessage('password is required')
    .isString().withMessage('password must be a string')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/)
    .withMessage('password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'),
    // check('imageName')
    // .notEmpty()
    // .withMessage('image name is requiered')
    // .matches(/\.(png|jpg|jpeg|gif)$/i)
    // .withMessage('image extension is not valid. Must be PNG, JPG, JPEG or GIF'),
    (req, res, next) => {
      validateResult(req, res, next)
    }
]

const validateUpdateUsername = [
    check('username')
    .exists()
    .isString()
    .withMessage('username must be a string')
    .isLength({min:3})
    .withMessage('username must be at least 3 characters long'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateUpdatePass = [
    check('password')
    .exists().withMessage('Password is required')
    .isString().withMessage('Password must be a string')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/)
    .withMessage('Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

const validateUpdateImageName = [
    check('imageName')
    .notEmpty()
    .withMessage('image name is requiered')
    .matches(/\.(png|jpg|jpeg|gif)$/i)
    .withMessage('image extension is not valid. Must be PNG, JPG, JPEG or GIF'),
    (req, res, next) => {
      validateResult(req, res, next)
    }
]

module.exports = { validateCreate, validateUpdateUsername, validateUpdatePass, validateUpdateImageName}