export const getToken = (cname: string = "token"): string => {
  if (typeof document === "undefined") {
    return "";
  }
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const setToken = (
  cname: string = "token",
  cvalue: string,
  exdays: number = 1
) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

export const removeToken = (cname: string = "token") => {
  document.cookie = cname + "=; Max-Age=-99999999;";
};
