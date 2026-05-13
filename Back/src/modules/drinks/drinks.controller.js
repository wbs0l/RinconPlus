import {DrinksService} from "./drinks.service.js";

export class DrinksController{

    static async getAllDrinks(req, res) {
        const drinks = await DrinksService.getAllDrinks();
        res.json(drinks);
    }

    static async getDrinkById(req, res) {
        const { id } = req.params;
        const drink = await DrinksService.getDrinkById(id);

        if(!drink){
            return res.status(404).json({ error: 'Bebida no encontrada' });
        }
          return res.json(drink);
    }

    static async createDrink(req, res) {
        const input  = req.body; // en input se guarda el objeto json 
        try {
            const newDrink = await DrinksService.createDrink(input);
           return res.status(201).json(newDrink);
        } catch (error) {
           return res.status(400).json({ error: error.message });
        }
    }

    static async deleteDrink(req, res) {
        const { id } = req.params;
        try {
            const deletedDrink = await DrinksService.deleteDrink(id);
            return res.json(deletedDrink);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }

    static async updateDrink(req, res) {
            const {id} = req.params;
            const input = req.body;
            try{
                const updatedDrink = await DrinksService.updateDrink(id, input);
                return res.status(200).json(updatedDrink);
            }catch (error){
                return res.status(404).json({error: error.message});
            }
        }
}