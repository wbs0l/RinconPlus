import {FoodService} from "./food.service.js";

export class FoodController {

    static async getAllFood(req, res) {
        const food = await FoodService.getAllFood();
        res.json(food);
    }

    static async getFoodById(req, res) {
        const {id} = req.params; // guarda id= 12
            const food = await FoodService.getFoodById(id);
            if (!food) {
                return res.status(404).json({error: 'Comida no encontrada'});
            }
             return res.json(food);
       
    }

    static async createFood(req, res) {
        const input = req.body; // en input se guarda el objeto json
        try{
            const newFood= await FoodService.createFood(input);
           return res.status(201).json(newFood);
        } catch (error){
            return res.status(400).json({error: error.message});
        }
    }

    static async deleteFood(req, res) {
        try{
            const deletedFood = await FoodService.deleteFood(req.params.id);
            return res.json(deletedFood);
        }catch (error){
            return res.status(404).json({error: error.message});
        }
    }

    static async updateFood(req, res) {
        const {id} = req.params;
        const input = req.body;
        try{
            const updatedFood = await FoodService.updatedFood(id, input);
            return res.status(200).json(updatedFood);
        }catch (error){
            return res.status(404).json({error: error.message});
        }
    }
}