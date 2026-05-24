import express from 'express';
import {corsMiddleware} from './src/middlewares/cors.js';
import {foodRouter} from './src/modules/food/food.routes.js';
import {drinksRouter} from './src/modules/drinks/drinks.routes.js';
import authRoutes from './src/modules/auth/auth.routes.js'
import bcrypt from "bcrypt"

const PORT = process.env.PORT || 3000;
const app = express();

app.use(corsMiddleware()); // Middleware para manejar CORS
app.options('*', corsMiddleware());
app.use(express.json()); // Middleware para parsear el body de las peticiones a JSON

app.use('/food', foodRouter); // Rutas para el módulo de comida
app.use('/drinks', drinksRouter); // Rutas para el módulo de bebidas
app.use('/api/auth', authRoutes); // ruta para identificacion de admin 

app.get('/', (req, res) => {
    res.send('API funcionando');
}); // ruta raíz para verificar que el servidor está funcionando correctamente



app.listen(PORT, ()=> {console.log(`Servidor corriendo en el puerto ${PORT}`)});




