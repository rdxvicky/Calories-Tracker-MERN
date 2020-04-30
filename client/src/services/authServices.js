import * as AJAX from "../middlewares/rest";
import { get } from "../conf";
import { getSession, adminSessionId, userSessionId } from "../middlewares/CacheSession";

const verifySession = (sessionId) =>
  AJAX.get(`${get('END_POINT_URL')}/ajax/verify/session?sessionId=${sessionId}`)
    .then((data) => data)
    .catch((errMessage) => errMessage);

const signUpUser = (email, name, password) =>
  AJAX.post(`${get('END_POINT_URL')}/ajax/user/profile/signup`, {
    email,
    password,
    name,
  })
    .then((data) => data)
    .catch((err) => { throw err; });

const loginUser = (email, password) =>
  AJAX.post(`${get('END_POINT_URL')}/ajax/user/login`, {
    email,
    password,
  })
    .then((data) => data)
    .catch((err) => { throw err; });

const adminLoginUser = (email, password) =>
  AJAX.post(`${get('END_POINT_URL')}/ajax/admin/login`, {
    email,
    password,
  })
    .then((data) => data)
    .catch((err) => { throw err; });

const logoutUser = () =>
  AJAX.get(`${get('END_POINT_URL')}/ajax/user/logout`, {
    sessionId: getSession(userSessionId)
  })
    .then((data) => data)
    .catch((err) => { throw err; });

const logoutAdmin = () =>
  AJAX.get(`${get('END_POINT_URL')}/ajax/admin/logout`, {
    sessionId: getSession(adminSessionId)
  })
    .then((data) => data)
    .catch((err) => { throw err; });

export { verifySession, signUpUser, loginUser, adminLoginUser, logoutUser, logoutAdmin };
