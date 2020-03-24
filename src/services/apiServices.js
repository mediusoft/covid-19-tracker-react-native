import axios from "axios";

const baseRoot = "https://covid19.mathdro.id/api";

export const getGlobalData = callBack => axios.get(baseRoot).then(callBack);

export const getCountryList = callBack => axios.get(`${baseRoot}/countries`).then(callBack);

export const getLocalData = (country, callBack) =>
  axios.get(`${baseRoot}/countries/${country}`).then(callBack);

export const getCurrrentCountryName = async ({ lng, lat }) => {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=90434ea1df6c475fad4ad5478ce5c0aa`;
  const res = await fetch(url);
  const location = await res.json();
  if (location) {
    if (location.results[0]) {
      return location.results[0].components.country;
    }
  }
  return "";
};
