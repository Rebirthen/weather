import React, { useState } from "react";

import { Container, Row, Col } from "reactstrap";
import { InputStatus } from "rambler-ui";
import { ComplexSearch, SuggestItem } from "rambler-ui/ComplexSearch";
import "../css/App.css";
import TopBarProgress from "react-topbar-progress-indicator";

import { getCities, getDataFromOpenWeather } from "../helpers/methods";

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

  const fetchQuery = query => {
    if (!query) {
      setCities([]);
      setCity({
        error: ""
      });
      setLoading(false);
      return false;
    }

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
    getDataFromOpenWeather(query)
      .then(data => {
        console.log("data", data);
      })
      .catch(err => {
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
        <Row>
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
      </Container>
    </div>
  );
}

export default Weather;
