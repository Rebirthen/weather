import React, { useState } from "react";

import { Container, Row, Col } from "reactstrap";
import { InputStatus } from "rambler-ui";
import { ComplexSearch, SuggestItem } from "rambler-ui/ComplexSearch";
import "../css/App.css";
import TopBarProgress from "react-topbar-progress-indicator";

import { getCities, getDataFromOpenWeather } from "../helpers/methods";
import { H1, H2, List } from "rambler-ui/Typography";
import moment from "moment";

TopBarProgress.config({
  barColors: {
    "0": "#fac20b",
    "1.0": "#fac20b"
  },
  shadowBlur: 5,
  barThickness: 5
});

function Weather() {
  const [city, setCity] = useState({
    name: "",

    error: ""
  });
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);
  const [weatherData, setWeatherData] = useState([]);

  const fetchQuery = query => {
    if (!query) {
      setCities([]);
      setCity({
        error: ""
      });
      setLoading(false);
      return false;
    }
    setSelected(false);
    setCity({
      ...city,
      name: query,
      error: ""
    });
    setLoading(true);

    getCities(query).then(cities => {
      setCities(cities);
      setLoading(false);
    });
  };

  const renderItem = str => {
    return (
      <span>
        <b>{str}</b>
      </span>
    );
  };

  const onSelectItem = query => {
    setCities([]);
    setLoading(true);

    getDataFromOpenWeather(query)
      .then(data => {
        setWeatherData(data);
        setLoading(false);
        setSelected(true);
      })
      .catch(err => {
        setLoading(false);
        setCity({
          ...city,
          error: "Извините, погода для этого местоположения не найдена"
        });
      });
  };

  return (
    <div className="main">
      {loading ? <TopBarProgress /> : null}
      <Container>
        <Row style={{ "margin-top": "100px" }}>
          <Col>
            <ComplexSearch
              value={city.name}
              onSearch={fetchQuery}
              onSelectItem={onSelectItem}
              onClickItem={onSelectItem}
              placeholder="Поиск города"
              searchButton="Поиск"
              searchButtonStyle={{ minWidth: 125 }}
              autoPositionY={false}
              onSubmit={fetchQuery}
            >
              {cities.map(item => (
                <SuggestItem value={item}>{renderItem(item)}</SuggestItem>
              ))}
            </ComplexSearch>
            {city.error && <InputStatus message={city.error} type="error" />}
          </Col>
        </Row>
        {selected && (
          <Row>
            <H1>{city.name} </H1>
          </Row>
        )}
        <Row>
          {weatherData.length > 0 && (
            <H2>
              {"Сейчас: " +
                weatherData[0].weather[0].description +
                ", " +
                parseInt(weatherData[0].main.temp_max) +
                "°C"}{" "}
            </H2>
          )}
        </Row>
        {weatherData.map(item => {
          return (
            <Row>
              <List>
                <li>
                  {"Дата: " + moment(item.dt * 1000).format("DD.MM - HH:mm")}
                </li>
                <li>{"Температура: " + parseInt(item.main.temp_max) + "°C"}</li>
                <li>{item.weather[0].description}</li>
              </List>
            </Row>
          );
        })}
      </Container>
    </div>
  );
}

export default Weather;
