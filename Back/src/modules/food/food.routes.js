import {Router} from 'express';
import {FoodController} from './food.controller.js';

export const foodRouter = Router();

foodRouter.get('/', FoodController.getAllFood);
foodRouter.get('/:id', FoodController.getFoodById);
foodRouter.post('/', FoodController.createFood);
foodRouter.delete('/:id', FoodController.deleteFood);
foodRouter.put('/:id', FoodController.updateFood);