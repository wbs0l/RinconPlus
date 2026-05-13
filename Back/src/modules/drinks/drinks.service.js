import {DrinksRepositorio} from "./drinks.repositorio.js";

export class DrinksService{

    static async getAllDrinks(){
        return await DrinksRepositorio.getAllDrinks()
    }

    static async getDrinkById(id){

        const drink = await DrinksRepositorio.getDrinkById(id);

        if (!drink){
            throw new Error('Bebida no encontrada');
        }
        return drink;
    }

    static async createDrink(input){

        if (!input.name || !input.price){
            throw new Error('Faltan campos obligatorios: nombre y precio');
        }
        return await DrinksRepositorio.createDrink(input);
    }

    static async deleteDrink(id){
        const deletedDrink = await DrinksRepositorio.delete(id);

        if (!deletedDrink){
            throw new Error('Bebida no encontrada para eliminar');
        }
        return deletedDrink;
    }

    static async updateDrink(id, input){
            const updatedDrink = await DrinksRepositorio.updateDrink(id, input);
            if (!updatedDrink){
                throw new Error('Bebida no encontrada para actualizar');
            }
            return updatedDrink;
        }
}