export default class GetQueryParams {
  constructor(paramName, urlRef) {
    // If we need to grab a query parameter value (perhaps to get macro data), this grabs it
    const url = urlRef || window.location.href;
    const name = paramName.replace(/[[\]]/g, "\\$&");
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return "";
    }
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
}

/*
export default GetQueryParams = (paramName, urlRef) => {
  // If we need to grab a query parameter value (perhaps to get macro data), this grabs it
  const url = urlRef || window.location.href;
  const name = paramName.replace(/[[\]]/g, "\\$&");
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};
*/
