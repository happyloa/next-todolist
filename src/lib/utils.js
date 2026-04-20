// Cookie 管理工具
export const setCookie = (name, value, days) => {
  if (typeof document === "undefined") return;
  const date = new Date();
  date.setDate(date.getDate() + days);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
};

export const getCookie = (name) => {
  if (typeof document === "undefined") return null;
  const regex = new RegExp(
    `(?:(?:^|.*;\\s*)${name}\\s*\\=\\s*([^;]*).*$)|^.*$`
  );
  return document.cookie.replace(regex, "$1") || null;
};

export const deleteCookies = () => {
  if (typeof document === "undefined") return;
  document.cookie.split(";").forEach((cookie) => {
    document.cookie = cookie.replace(
      /=.*/,
      "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"
    );
  });
};
