import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import managePatients from './reducers/managePatients';

const enhancers = () => {
    return (applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
}

const patientStore = createStore(managePatients
    , enhancers()
    );

ReactDOM.render(
    <Provider store={patientStore}> 
        <App /> 
    </Provider>, 
    document.getElementById('root')
);

serviceWorker.unregister();
