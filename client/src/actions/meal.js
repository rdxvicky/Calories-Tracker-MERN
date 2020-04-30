import * as MEAL_CONST from "../constants/meal";
import { mealGetter, mealSetter, mealUpdater, mealDeleter } from "../services";

export const getMeals = (...args) => (dispatch, getState) => {
  dispatch({
    type: MEAL_CONST.FETCH_MEAL_PENDING,
    payload: mealGetter(...args)
      .then((data) =>
        dispatch({
          type: MEAL_CONST.FETCH_MEAL_FULFILLED,
          payload: data,
        })
      )
      .catch((errMessage) =>
        dispatch({
          type: MEAL_CONST.FETCH_MEAL_REJECTED,
          payload: errMessage,
        })
      ),
  });
};
export const saveMeal = (...args) => (dispatch, getState) => {
  dispatch({
    type: MEAL_CONST.SAVE_MEAL_PENDING,
    payload: mealSetter(...args)
      .then((data) =>
        dispatch({
          type: MEAL_CONST.SAVE_MEAL_FULFILLED,
          payload: data,
        })
      )
      .catch((errMessage) =>
        dispatch({
          type: MEAL_CONST.SAVE_MEAL_REJECTED,
          payload: errMessage,
        })
      ),
  });
};
export const updateMeal = (...args) => (dispatch, getState) => {
  dispatch({
    type: MEAL_CONST.UPDATE_MEAL_PENDING,
    payload: mealUpdater(...args)
      .then((data) =>
        dispatch({
          type: MEAL_CONST.UPDATE_MEAL_FULFILLED,
          payload: data,
        })
      )
      .catch((errMessage) =>
        dispatch({
          type: MEAL_CONST.UPDATE_MEAL_REJECTED,
          payload: errMessage,
        })
      ),
  });
};
export const removeMeal = (...args) => (dispatch, getState) => {
  dispatch({
    type: MEAL_CONST.DELETE_MEAL_PENDING,
    payload: mealDeleter(...args)
      .then((data) =>
        dispatch({
          type: MEAL_CONST.DELETE_MEAL_FULFILLED,
          payload: data,
        })
      )
      .catch((errMessage) =>
        dispatch({
          type: MEAL_CONST.DELETE_MEAL_REJECTED,
          payload: errMessage,
        })
      ),
  });
};
