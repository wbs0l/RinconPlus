import crypto from 'node:crypto';
import sql from '../../../db/connection.js';

export class DrinksRepositorio {

    static async getAllDrinks() {
        const drinksData = await sql `SELECT * FROM products WHERE category_id IN (5,6)`; // devuelve bebida alcoholica y no alcoholica
        return drinksData;
    }

    static async getDrinkById(id){
        const drink = await sql `SELECT * FROM products WHERE id = ${id}`;
        return drink[0];
    }
    
    static async createDrink({name, description, price, image, tag, category}){ 
        const id= crypto.randomUUID();
        const newDrinkItem = await sql `INSERT INTO products (id, name, description, price, image_url, tag, category_id) VALUES (${id}, ${name}, ${description}, ${price}, ${image}, ${tag}, ${category}) RETURNING *`;
        // el RETURNING * devuelve el nuevo registro insertado en la tabla, y se guarda en newDrinkItem, que es un array con un solo elemento (el nuevo registro)
        return newDrinkItem[0];
    }

    static async delete (id){
        const deletedDrink = await sql `DELETE FROM products WHERE id = ${id} RETURNING *`;

        return deletedDrink[0] || null; // Si no se encuentra la bebida, devuelve null
    }

    static async updateDrink(id, input) { // para que sea exitoso es necesiario enviar el id y el body completo que sea destructurado del input 
        const {name, description, price, image, tag, category_id, avaliable} = input;
        const [updatedDrink]= await sql `UPDATE products SET name = ${name}, description = ${description}, price = ${price}, image_url = ${image}, avaliable = ${avaliable}, tag = ${tag}, category_id = ${category_id} WHERE id = ${id} RETURNING *`;
        // en la consulta sql se debe incluir si o si los campos luego del set aunque no se quieran actualizar, porque si no se incluyen, esos campos se actualizan a null, lo que no es deseable. Por eso se recomienda enviar el body completo con todos los campos, aunque no se quieran actualizar, para evitar que se actualicen a null.
        return updatedDrink || null;
    }
}