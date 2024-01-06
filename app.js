const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;


// Enable CORS for all routes
// const corsOptions = {
//     origin: 'http://yourfrontenddomain.com',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, // enable set cookie
//     optionsSuccessStatus: 204,
// };

// app.use(cors(corsOptions));
app.use(cors());  //Uncoment Later
// Configuração para servir arquivos estáticos (separados do frontend)
app.use(express.static('public'));

// Configuração da view engine (pug, por exemplo)
// app.set('view engine', 'pug');
// app.set('views', './views');

// Rotas
const indexRoute = require('./routes/index');
const orderRoute = require('./routes/order');

app.use('/', indexRoute);
app.use('/product', orderRoute);

const bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Inicie o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


