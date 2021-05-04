import React from 'react';
import ReactDOM from 'react-dom';
import '../src/style/site.scss';
import reportWebVitals from './reportWebVitals';
import App from './App';
import {createStore } from 'redux';
import allReducers from './script/reducers';
import { Provider } from 'react-redux';

const store = createStore(
	allReducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);


ReactDOM.render(
    <Provider store={store}>
		<App/>
	</Provider>,
  document.getElementById('root')
);

reportWebVitals();
