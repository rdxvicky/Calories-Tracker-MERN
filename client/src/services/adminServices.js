import * as AJAX from "../middlewares/rest";
import { get } from "../conf";
import { getSession, adminSessionId } from '../middlewares/CacheSession'

const allUserProfilesGetter = () =>
  AJAX.get(
    `${get('END_POINT_URL')}/ajax/admin/fetch/users`, {
    sessionid: getSession(adminSessionId)
  }
  )
    .then((data) => data)
    .catch((err) => { throw err; });

const updateUserProfilesGetter = (userId, fieldName, fieldValue) =>
  AJAX.put(
    `${get('END_POINT_URL')}/ajax/admin/toggle/user/active`, {
    _id: userId,
    [fieldName]: fieldValue,
  }, {
    sessionid: getSession(adminSessionId)
  })
    .then((data) => data)
    .catch((err) => { throw err; });

const createUserSessionGetter = (userId) =>
  AJAX.post(
    `${get('END_POINT_URL')}/ajax/admin/user/login`, {
    _id: userId
  }, {
    sessionid: getSession(adminSessionId)
  })
    .then((data) => data)
    .catch((err) => { throw err; });

export { allUserProfilesGetter, updateUserProfilesGetter, createUserSessionGetter };