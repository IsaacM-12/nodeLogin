const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const AuthController = require('./AuthController');
const authController = new AuthController();
const router = express.Router();
const app = express();

// Conectar a la base de datos
mongoose.connect('mongodb://127.0.0.1:27017/authdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión exitosa a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB', err));

    app.use(express.json())
    app.use(router);
    app.set('view engine', 'ejs');
    app.set('views', './views');
    
    app.listen(3000, () => console.log('Server running on port 3000'));

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


// Ruta para mostrar el formulario de inicio de sesión
router.get('/login', (req, res) => {
    res.render('login');
    });

// Ruta para procesar el formulario de inicio de sesión
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    authController.login(username, password)
    .then(token => {
    res.redirect('/welcome');
})
    .catch(err => {
    console.error(err);
    res.redirect('/login');
    });
});

module.exports = router;

// Ruta para mostrar el formulario de registro de usuarios
router.get('/register', (req, res) => {
    res.render('register');
});


router.post('/register', function (req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    authController.register(username, email, password)
    .then(() => {
        res.redirect('/login');
    })
    .catch(err => {
        console.error(err);
        res.redirect('/register');
    });

});

router.get('/welcome', (req, res) => {
    res.render('welcome');
    });

router.get('/', (req, res) => {
    res.render('Inicio');
    });

    
router.post('/', (req, res) => {
    const action = req.body.action;
    if (action === 'login') {
        // Redirigir al usuario a la página de inicio de sesión
        res.redirect('/login');
    } else if (action === 'register') {
        // Redirigir al usuario a la página de inicio de sesión
        res.redirect('/register');
    }
    });