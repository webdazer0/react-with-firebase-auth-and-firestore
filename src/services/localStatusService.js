const userKey = "_user_app";

export const save = (value) => {
  const result = JSON.parse(value);
  console.log("save =>", result);
  window.localStorage.setItem(userKey, value);
};
export const getStatus = () => {
  const result = window.localStorage.getItem(userKey);
  const decoded = JSON.parse(result);
  console.log({ isAuth: Boolean(decoded) }); //
  return Boolean(decoded);
};

export const clear = () => window.localStorage.removeItem("_user_app");
//
export const clearAll = () => window.localStorage.clear();
