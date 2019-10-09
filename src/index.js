import React from 'react';
import ReactDOM from 'react-dom';
import Weather from './ui/components/Weather';
import { ApplyTheme } from 'rambler-ui/theme'
import './ui/css/index.css';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <ApplyTheme>
    <Weather />
  </ApplyTheme>,
  document.getElementById('root')
);
