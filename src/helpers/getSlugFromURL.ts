const getSlugFromURL = (url: string) => {
  return url.split(".html")[0];
};

export default getSlugFromURL;
