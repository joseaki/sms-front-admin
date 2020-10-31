import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import './index.css';

function render() {
  // eslint-disable-next-line global-require
  const App = require('./app/App').default;
  ReactDOM.render(
    <Root>
      <App />
    </Root>,
    document.getElementById('root'),
  );
}

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./app/App', render);
}
