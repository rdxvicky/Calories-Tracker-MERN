import * as AJAX from "../middlewares/rest";
import { get } from "../conf";
import { getSession, userSessionId } from '../middlewares/CacheSession';

const profileGetter = () =>
  AJAX.get(`${get('END_POINT_URL')}/ajax/user/profile/fetch`, {
    sessionid: getSession(userSessionId)
  })
    .then((data) => data)
    .catch((err) => { throw err; });

const profileSetter = (email, password, name) =>
  AJAX.post(`${get('END_POINT_URL')}/ajax/user/profile/signup`, {
    email,
    password,
    name,
  },{
    sessionid: getSession(userSessionId)
  })
    .then((data) => data)
    .catch((err) => { throw err; });

const profileUpdater = (fieldName, fieldValue) =>
  AJAX.put(`${get('END_POINT_URL')}/ajax/user/profile/update`, { 
    [fieldName]: fieldValue,
   }, {
    sessionid: getSession(userSessionId)
  })
    .then((data) => data)
    .catch((err) => { throw err; });

export { profileGetter, profileSetter, profileUpdater };
