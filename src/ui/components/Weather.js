import React, { useState } from "react";
import Input from "rambler-ui/Input";
import FormGroup from "rambler-ui/FormGroup";
import Button from "rambler-ui/Button";
import { Container, Row, Col } from "reactstrap";
import { ComplexSearch, SuggestItem } from "rambler-ui/ComplexSearch";
import "../css/App.css";
import { getCities, getDataFromOpenWeather } from "../helpers/methods";

function Weather() {
  const [city, setCity] = useState({
    name: "",
    isLoading: true,
    serviceValue: ""
  });
  const [cities, setCities] = useState([]);

  const fetchQuery = query => {
    if (!query) {
      setCities([]);
      return false;
    }
    setCity({
      ...city,
      name: query
    });

    getCities(query).then(cities => {
      setCities(cities);
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
    getDataFromOpenWeather(query).then(data => {
      console.log("data", data);
    });
  };

  return (
    <div className="main">
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
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Weather;
