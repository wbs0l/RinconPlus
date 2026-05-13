import {Router} from 'express';
import {DrinksController} from './drinks.controller.js';

export const drinksRouter = Router();

drinksRouter.get('/', DrinksController.getAllDrinks);
drinksRouter.get('/:id', DrinksController.getDrinkById);
drinksRouter.post('/', DrinksController.createDrink);
drinksRouter.delete('/:id', DrinksController.deleteDrink);
drinksRouter.put('/:id', DrinksController.updateDrink);