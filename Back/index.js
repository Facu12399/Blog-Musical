const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/config.js');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRouter.js');
const authenticateToken = require('./middleware/authMiddleware.js');
const app = express();
const db = require('./data/db.js');

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());

// Ruta principal
app.get('/', (req, res) => {
  const user = req.user;
  res.render('index', { user });
});

// Rutas de autenticación
app.use('/', userRouter);

// Conexión a la base de datos
const conexionDB = async () => {
  try {
    await db.authenticate();
    console.log('Conectado OK a la Base de datos');
  } catch (error) {
    console.log(`Hay un error y es el siguiente : ${error}`);
  }
};

app.listen(PORT, () => {
  conexionDB();
  console.log(`Server running on port ${PORT}`);
});
