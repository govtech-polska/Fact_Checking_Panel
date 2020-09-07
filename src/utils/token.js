const LEGACY_AUTH_TOKEN = 'AUTH_TOKEN';
const AUTH_KEY = 'localStorage.AUTH_KEY';

export const getToken = () => {
  const legacyToken = sessionStorage.getItem(LEGACY_AUTH_TOKEN) || localStorage.getItem(LEGACY_AUTH_TOKEN);

  if (legacyToken) {
    return legacyToken;
  }

  const data = JSON.parse(localStorage.getItem(AUTH_KEY));
  if (!data || new Date(data.validationDate) < new Date()) {
    return null;
  } else {
    return data.token;
  }
};

export const setToken = (token, remember) => {
  clearToken();
  const validationDate = new Date();
  validationDate.setDate(validationDate.getDate() + (remember ? 365 : 1));
  localStorage.setItem(AUTH_KEY, JSON.stringify({ token, validationDate }));
};

export const clearToken = () => {
  localStorage.removeItem(AUTH_KEY);
};
