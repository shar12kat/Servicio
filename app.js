// Se inicia el módulo express para iniciar el servidor:
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Se llama al body-parser:
app.use(bodyParser.json());

//Se importan las rutas:
const postRoute = require('.routes/post');
app.use('/servicios', postRoute);

// Se crean las rutas:
app.get('/', (req, res) => {
    res.send('¡Autenticación realizada con satisfacción!');
});
//¿Cómo escucha el servidor las peticiones?
appsistema.listen(3000);
mongoose.connect ('mongodb://localhost:27017/Servicio');
app.listen(3000);



