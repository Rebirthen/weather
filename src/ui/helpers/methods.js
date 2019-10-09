import axios from "axios";

const HERE_MAPS_APP_ID = "baCfmbuyiEd9tPoPVCcV";
const HERE_MAPS_APP_CODE = "Vnj0oRM5P6aPbyncA5HPNQ";
const WEATHER_APPID = "3a0564475cd9c8abe61a00538aa65645";

export const getCities = str => {
  return new Promise(function(resolve, reject) {
    axios({
      method: "get",
      url: "https://geocoder.api.here.com/6.2/geocode.json",
      params: {
        app_id: HERE_MAPS_APP_ID,
        app_code: HERE_MAPS_APP_CODE,
        searchtext: str
      }
    })
      .then(response => {
        const view = response.data.Response.View || [];

        if (view && view.length > 0) {
          const res = (
            view[0].Result.map(item => {
              return item.Location.Address.City || "";
            }) || []
          ).filter(item => item.length !== 0);

          return resolve(res);
        }
      })
      .catch(err => {
        return reject(err);
      });
  });
};

export const getDataFromOpenWeather = str => {
  return new Promise(function(resolve, reject) {
    // axios
    //   .get(
    //     `http://api.openweathermap.org/data/2.5/forecast?q=${str}&APPID=3a0564475cd9c8abe61a00538aa65645`
    //   )
    //   .then(function(response) {
    //     // handle success
    //     return resolve(response.data.list);
    //   })
    //   .catch(function(error) {
    //     // handle error
    //     return reject(error);
    //   });

    axios({
      method: "get",
      url: "http://api.openweathermap.org/data/2.5/forecast",
      params: {
        q: str,
        APPID: WEATHER_APPID
      }
    })
      .then(response => {
        return resolve(response.data.list);
      })
      .catch(error => {
        return reject(error);
      });
  });
};
