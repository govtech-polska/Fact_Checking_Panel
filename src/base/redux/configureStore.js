import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './rootSaga';
import rootReducer from './rootReducer';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default initialState => {
  const middlewares = [sagaMiddleware];

  if (!process.env.NODE_ENV === 'production') {
    const { createLogger } = require('redux-logger');
    const loggerMiddleware = createLogger({
      level: 'info',
      collapsed: true
    });
    middlewares.push(loggerMiddleware);
  }

  const store = createStore(rootReducer, initialState, composeEnhancers(...middlewares.map(m => applyMiddleware(m))));

  sagaMiddleware.run(rootSaga);

  return store;
};
