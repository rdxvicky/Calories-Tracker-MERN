import * as PROFILE_CONST from "../constants/profile";
import { profileGetter, profileSetter, profileUpdater } from "../services";

export const getProfile = (...args) => (dispatch, getState) => {
  dispatch({
    type: PROFILE_CONST.FETCH_PROFILE_PENDING,
    payload: profileGetter(...args)
      .then((data) =>
        dispatch({
          type: PROFILE_CONST.FETCH_PROFILE_FULFILLED,
          payload: data,
        })
      )
      .catch((errMessage) =>
        dispatch({
          type: PROFILE_CONST.FETCH_PROFILE_REJECTED,
          payload: errMessage,
        })
      ),
  });
};
export const saveProfile = (...args) => (dispatch, getState) => {
  dispatch({
    type: PROFILE_CONST.SAVE_PROFILE_PENDING,
    payload: profileSetter(...args)
      .then((data) =>
        dispatch({
          type: PROFILE_CONST.SAVE_PROFILE_FULFILLED,
          payload: data,
        })
      )
      .catch((errMessage) =>
        dispatch({
          type: PROFILE_CONST.SAVE_PROFILE_REJECTED,
          payload: errMessage,
        })
      ),
  });
};
export const updateProfile = (...args) => (dispatch, getState) => {
  dispatch({
    type: PROFILE_CONST.UPDATE_PROFILE_PENDING,
    payload: profileUpdater(...args)
      .then((data) =>
        dispatch({
          type: PROFILE_CONST.UPDATE_PROFILE_FULFILLED,
          payload: data,
        })
      )
      .catch((errMessage) =>
        dispatch({
          type: PROFILE_CONST.UPDATE_PROFILE_REJECTED,
          payload: errMessage,
        })
      ),
  });
};
// export const removeProfile = () => (dispatch, getState) => {
//     dispatch({
//         type: PROFILE_CONST.DELETE_PROFILE_PENDING,
//         payload: AJAX.remove(`${get('END_POINT_URL')}/ajax`)
//                     .then(data => dispatch({
//                         type: PROFILE_CONST.DELETE_PROFILE_FULFILLED,
//                         payload: data,
//                     }))
//                     .catch(errMessage => dispatch({
//                         type: PROFILE_CONST.DELETE_PROFILE_REJECTED,
//                         payload: errMessage,
//                     }))
//     })
// }
