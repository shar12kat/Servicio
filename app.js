// Se inicia el módulo express para iniciar el servidor:
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('./user');

//Se llama al body-parser:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

const mongo_uri = 'mongodb+srv://sharlimkat:1234@cluster0.paqhggz.mongodb.net/?retryWrites=true&w=majority'; //Esta dirección del servidor de MongoDB se obtiene registrándose en la página de MongoDB y creando un clúster.*/

mongoose.connect(mongo_uri, function(err) {
    if(err) {
        throw err;
    } else {
        console.log('Conección satisfactoria a ${mongo_uri}');
    }
});

/*Se importan las rutas:
const postRoute = require('.routes/post')
app.use('/servicios', postRoute)*/

// Se crean las rutas:
app.post('/authenticate', (req, res) => {
    const {username, password} = req.body;

    User.findOne({username}, (err, user) => {
        if(err){
            res.status(500).send('Error al registrar al usuario');
        }else if(!user){
            res.status(500).send('El usuario no existe');
        }else{
            user.isCorrectPassword(password, (err, result) =>{
                if(err){
                    res.status(500).send('Error al autenticar');
                }else if(result){
                    res.status(200).send('Usuario autenticado con satisfacción');
                }else{
                    res.status(500).send('Usuario y/o contraseña incorrecto(s)');
                }
            });
        }
    });
});

app.post('/register', (req, res)=> {
    const {username, password} = req.body;
    const user = new User ({username, password})
    user.save(err => {
        if(err){
            res.status(500).send('Error al registrar al usuario');
        }else{
            res.status(200).send('Usuario registrado');
        }
    });
});

//¿Cómo escucha el servidor las peticiones?
app.listen(3000, () => {
    console.log('Servidor iniciado');
});







