import React, { useState } from "react";
import Input from "rambler-ui/Input";
import FormGroup from "rambler-ui/FormGroup";
import "./App.css";

function Weather() {
  const [city, setCity] = useState({ city: "Алматы" });

  const changeCity = event => {
    let { name, value } = event.target;
    setCity({
      ...city,
      [name]: value
    });
  };

  return (
    <div>
      <FormGroup>
        <Input
          type="text"
          name="city"
          value={city.city}
          onChange={changeCity}
          placeholder="placeholder"
          variation="awesome"
        />
      </FormGroup>
    </div>
  );
}

export default Weather;
