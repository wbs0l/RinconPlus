import {FoodRepositorio} from './food.repositorio.js';

export class FoodService{

    static async getAllFood(){
        return await FoodRepositorio.getAllFood();
    }

    static async getFoodById(id){

        const food = await FoodRepositorio.getFoodById(id);

        if (!food){
            throw new Error('Comida no encontrada');
        }
        return  food;
    }

    static async createFood(input){

        if (!input.name || !input.price){
            throw new Error('Faltan campos obligatorios: nombre y precio');
        }
        return await FoodRepositorio.createFood(input);
    }

    static async deleteFood(id){
        const deletedFood = await FoodRepositorio.delete(id);

        if (!deletedFood){
            throw new Error('Comida no encontrada para eliminar');
        }
        return deletedFood;
    }

    static async updatedFood(id, input){
        const updatedFood = await FoodRepositorio.updateFood(id, input);
        if (!updatedFood){
            throw new Error('Comida no encontrada para actualizar');
        }
        return updatedFood;
    }
}