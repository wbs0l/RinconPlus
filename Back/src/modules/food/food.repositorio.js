import crypto from 'node:crypto';
import sql from '../../../db/connection.js';

export class FoodRepositorio {

     static async getAllFood() {
        const foodData = await sql `SELECT * FROM products WHERE category_id NOT IN (5,6)`; // devuelve comida, excluyendo bebidas
        return foodData;
    }

    static async getFoodById(id) {
        const food = await sql `SELECT * FROM products WHERE id = ${id}`;
        return food[0];
    }

    // queda pendiente para no incluir un objeto repetido en el array, revisar si el nombre ya existe antes de crear un nuevo objeto
    static async createFood({name, description, price, image, tag, category}) {
        const id = crypto.randomUUID();
        const newFoodItem = await sql `INSERT INTO products (id, name, description, price, image_url, tag, category_id) VALUES (${id}, ${name}, ${description}, ${price}, ${image}, ${tag}, ${category}) RETURNING *`;
        return newFoodItem[0];
    }

    static async delete (id){
        const deletedFood = await sql `DELETE FROM products WHERE id = ${id} RETURNING *`;
        return deletedFood[0] || null;
    }

    static async updateFood(id, input) {
        const {
            name,
            description,
            price,
            image,
            tag,
            category_id
        } = input;
        const [updatedFood]= await sql `UPDATE products SET name = ${name}, description = ${description}, price = ${price}, image_url = ${image}, tag = ${tag}, category_id = ${category_id} WHERE id = ${id} RETURNING *`;
        return updatedFood || null;
    }
}
