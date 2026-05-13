import express from 'express';
import Default from './configPred.js';
import {corsMiddleware} from './src/middlewares/cors.js';
import {foodRouter} from './src/modules/food/food.routes.js';
import {drinksRouter} from './src/modules/drinks/drinks.routes.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(corsMiddleware()); // Middleware para manejar CORS
app.use(express.json()); // Middleware para parsear el body de las peticiones a JSON

app.use('/food', foodRouter); // Rutas para el módulo de comida
app.use('/drinks', drinksRouter); // Rutas para el módulo de bebidas





app.listen(PORT, ()=> {console.log(`Servidor corriendo en el puerto ${PORT}`)});


