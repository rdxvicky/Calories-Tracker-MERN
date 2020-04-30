import * as AJAX from "../middlewares/rest";
import { get } from "../conf";
import { getSession, userSessionId } from "../middlewares/CacheSession";

const mealGetter = (minRange, maxRange) =>
  AJAX.get(
    `${get('END_POINT_URL')}/ajax/meal/fetch?minRange=${minRange}&maxRange=${maxRange}`, {
      sessionid: getSession(userSessionId)
    }
  )
    .then((data) => data)
    .catch((err) => { throw err; });

const mealSetter = (mealData) =>
  AJAX.post(`${get('END_POINT_URL')}/ajax/meal/save`,
    mealData, {
    sessionid: getSession(userSessionId)
  })
    .then((data) => data)
    .catch((err) => { throw err; });

const mealUpdater = (mealData) =>
  AJAX.put(`${get('END_POINT_URL')}/ajax/meal/update`,
    mealData, {
      sessionid: getSession(userSessionId)
    })
    .then((data) => data)
    .catch((err) => { throw err; });

const mealDeleter = (_id, mealName, mealCalories, mealDate) =>
  AJAX.remove(`${get('END_POINT_URL')}/ajax/meal/remove/${_id}`,
    null, {
      sessionid: getSession(userSessionId)
    })
    .then((data) => data)
    .catch((err) => { throw err; });

export { mealGetter, mealSetter, mealUpdater, mealDeleter };
