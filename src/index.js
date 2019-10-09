import React from 'react';
import ReactDOM from 'react-dom';
import Weather from './Weather';
import { ApplyTheme } from 'rambler-ui/theme'
import './index.css';

ReactDOM.render(
  <ApplyTheme>
    <Weather />
  </ApplyTheme>,
  document.getElementById('root')
);
