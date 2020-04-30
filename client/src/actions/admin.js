import * as PROFILE_CONST from "../constants/profile";
import { allUserProfilesGetter, updateUserProfilesGetter } from "../services";

export const getAllUserProfiles = (...args) => (dispatch, getState) => {
  dispatch({
    type: PROFILE_CONST.FETCH_ALL_PROFILE_PENDING,
    payload: allUserProfilesGetter(...args)
      .then((data) =>
        dispatch({
          type: PROFILE_CONST.FETCH_ALL_PROFILE_FULFILLED,
          payload: data,
        })
      )
      .catch((errMessage) =>
        dispatch({
          type: PROFILE_CONST.FETCH_ALL_PROFILE_REJECTED,
          payload: errMessage,
        })
      ),
  });
};

export const updateUserProfile = (...args) => (dispatch) => {
  dispatch({
    type: PROFILE_CONST.UPDATE_PROFILE_ADMIN_PENDING,
    payload: updateUserProfilesGetter(...args)
      .then((data) =>
        dispatch({
          type: PROFILE_CONST.UPDATE_PROFILE_ADMIN_FULFILLED,
          payload: data,
        })
      )
      .catch((errMessage) =>
        dispatch({
          type: PROFILE_CONST.UPDATE_PROFILE_ADMIN_REJECTED,
          payload: errMessage,
        })
      ),
  });
}

