
import { AppToaster } from "../components/toaster";
import { Intent } from '@blueprintjs/core';
import * as MEAL_CONST from '../constants/meal';

const meal = (state = MEAL_CONST.mealDefaultState, action) => {
    switch(action.type) {
        case MEAL_CONST.FETCH_MEAL_PENDING: {
            return {
                ...state,
            };
        }
        case MEAL_CONST.FETCH_MEAL_FULFILLED: {
            AppToaster.show({ message: 'Meal Fetched Successfully', intent: Intent.SUCCESS });
            return {
                ...state,
                savedMeals: action.payload,
            };
        }
        case MEAL_CONST.FETCH_MEAL_REJECTED: {
            return {
                ...state,
            };
        }
        case MEAL_CONST.SAVE_MEAL_PENDING: {
            return {
                ...state,
            };
        }
        case MEAL_CONST.SAVE_MEAL_FULFILLED: {
            AppToaster.show({ message: 'Meal Saved Successfully', intent: Intent.SUCCESS });
            return {
                ...state,
                savedMeals: [
                    action.payload,
                    ...state.savedMeals
                ],
            };
        }
        case MEAL_CONST.SAVE_MEAL_REJECTED: {
            AppToaster.show({ message: action.payload, intent: Intent.DANGER });
            return {
                ...state,
            };
        }
        case MEAL_CONST.UPDATE_MEAL_PENDING: {
            return {
                ...state,
            };
        }
        case MEAL_CONST.UPDATE_MEAL_FULFILLED: {
            const mealData = action.payload;
            const savedMeals = state.savedMeals.map(meal => {
                if(meal._id ===  mealData._id) {
                    return mealData;
                } else
                    return meal;
            });
            AppToaster.show({ message: 'Meal Updated Successfully', intent: Intent.SUCCESS });
            return {
                ...state,
                savedMeals: [...savedMeals],
            };
        }
        case MEAL_CONST.UPDATE_MEAL_REJECTED: {
            AppToaster.show({ message: action.payload, intent: Intent.DANGER });
            return {
                ...state,
            };
        }
        case MEAL_CONST.DELETE_MEAL_PENDING: {
            return {
                ...state,
            };
        }
        case MEAL_CONST.DELETE_MEAL_FULFILLED: {
            const mealId = action.payload;
            const savedMeals = state.savedMeals.filter(meal => meal._id !== mealId);
            AppToaster.show({ message: 'Meal Deleted Successfully', intent: Intent.SUCCESS });
            return {
                ...state,
                savedMeals: [...savedMeals],
            };
        }
        case MEAL_CONST.DELETE_MEAL_REJECTED: {
            AppToaster.show({ message: action.payload, intent: Intent.DANGER });
            return {
                ...state,
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
  };

export default meal;
