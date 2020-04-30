export const adminSessionId = 'ADMIN-SESSION-ID';
export const userSessionId = 'USER-SESSION-ID';

export const getSession = (sessionUser) => window.sessionStorage.getItem(sessionUser);
export const saveSession = (sessionUser, sessionId) => window.sessionStorage.setItem(sessionUser, sessionId);
export const takeSession = (sessionUser) => window.sessionStorage.removeItem(sessionUser);
export const removeSession = () => window.sessionStorage.clear();