import {
  adminSessionId,
  userSessionId,
  saveSession,
  removeSession,
  takeSession,
} from "../middlewares/CacheSession";
import { AppToaster } from "../components/toaster";
import {
  verifySession,
  signUpUser,
  loginUser,
  adminLoginUser,
  logoutUser,
  logoutAdmin,
  createUserSessionGetter
} from "../services";
import { Intent } from "@blueprintjs/core";

export const verifyUserSession = (sessionId) => (dispatch, getState) => {
  verifySession(sessionId)
    .then((data) => {
      const { role, sessionId } = data; // role: adminSessionId/userSessionId

      switch (role) {
        case adminSessionId: {
          saveSession(adminSessionId, sessionId);
          break;
        }
        case userSessionId: {
          saveSession(userSessionId, sessionId);
          break;
        }
        default: {
          removeSession();
          window.location.assign("/login");
          break;
        }
      }
    })
    .catch((errMessage) => {
      removeSession();
      switch(window.location.pathname.split('/')[1]) {
        case 'admin': {
          window.location.assign("/admin/login");
          return;
        }
        default: {
          window.location.assign("/login");
          return;
        }
      }
    });
};

export const signUp = (email, name, password) => (dispatch) => {
  signUpUser(email, name, password)
    .then((data) => {
      AppToaster.show({ message: "Successfully Created Account", intent: Intent.SUCCESS });
    })
    .catch((errMessage) => {
      AppToaster.show({ message: errMessage, intent: Intent.DANGER });
    });
};

export const login = (email, password) => (dispatch) => {
  loginUser(email, password)
    .then((data) => {
      saveSession(userSessionId, data);
      window.location.assign("/");
      setTimeout(() => {
        AppToaster.show({ message: "Successfully Logged In", intent: Intent.SUCCESS });
      }, 2000);
    })
    .catch((errMessage) => {
      AppToaster.show({ message: errMessage, intent: Intent.DANGER });
    });
};

export const adminLogin = (email, password) => (dispatch) => {
  adminLoginUser(email, password)
    .then((data) => {
      saveSession(adminSessionId, data);
      window.location.assign("/admin");
      setTimeout(() => {
        AppToaster.show({ message: "Successfully Logged In", intent: Intent.SUCCESS });
      }, 2000);
    })
    .catch((errMessage) => {
      AppToaster.show({ message: errMessage, intent: Intent.DANGER });
    });
};

export const createUserSession = (...args) => (dispatch) => {
  createUserSessionGetter(...args)
    .then((data) =>{
      saveSession(userSessionId, data);
      AppToaster.show({ message: "Successfully Logged In", intent: Intent.SUCCESS });
      setTimeout(() => {
        window.location.assign("/");
      }, 2000);
    })
    .catch((errMessage) => {
      takeSession(userSessionId);
      AppToaster.show({ message: errMessage, intent: Intent.DANGER });
    });
}

export const userLogout = (...args) => (dispatch) => {
  logoutUser(...args)
    .then((data) => {
      takeSession(userSessionId);
      AppToaster.show({ message: "Successfully User LogOut", intent: Intent.SUCCESS });
      setTimeout(() => {
        window.location.assign("/login");
      }, 1000);
    })
    .catch((errMessage) => {
      AppToaster.show({ message: errMessage, intent: Intent.DANGER });
    });
};

export const adminLogout = (...args) => (dispatch) => {
  logoutAdmin(...args)
    .then((data) => {
      takeSession(adminSessionId);
      AppToaster.show({ message: "Successfully Admin LogOut", intent: Intent.SUCCESS });
      setTimeout(() => {
        window.location.assign("/admin/login");
      }, 1000);
    })
    .catch((errMessage) => {
      AppToaster.show({ message: errMessage, intent: Intent.DANGER });
    });
};
