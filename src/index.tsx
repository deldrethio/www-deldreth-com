import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from 'app/containers/app';
import store from 'app/store';

import 'flexboxgrid/dist/flexboxgrid.min.css';

ReactDOM.render(
  <Provider store={ store() }>
    <App />
  </Provider>,
  document.getElementById( 'root' ),
);
