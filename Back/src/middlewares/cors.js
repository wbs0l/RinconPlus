import cors from 'cors';

const ACCEPTED_ORIGINS= ['http://localhost:3000',  'http://127.0.0.1:5500', 'http://localhost:1235'] 


// al ser pasado como parametro acceptedOrigns se puede configurar la lista de origenes permitidos desde el index.js o cualquier otro archivo que importe este middleware, lo que hace que sea mas reutilizable y flexible para diferentes entornos o necesidades.
export const corsMiddleware=({ acceptedOrigins= ACCEPTED_ORIGINS } = {})=>{ // antes de la flecha de function se agrega = {} en caso de que el parametro sea vacio y no se detenga 
    return cors({ // se configura el middleware de CORS para permitir solo los origenes especificados
     origin : (origin, callback) => {

        // permitir requests sin origin
            if (!origin) {
                return callback(null, true);
            }

        if(acceptedOrigins.includes(origin)){
           return callback(null, true); // el primero siempre debe ser null y el segundo es un booleano que indica si se permite el origen o no
        }
        return callback(new Error('Origin not allowed'));
        }// si el origen esta en la lista de origenes permitidos o no hay origen (peticiones desde el mismo servidor)
    });
}

