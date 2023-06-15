// src/redux/store/store.js
import { createStore, combineReducers} from 'redux';
import variableReducer from '../reducers/variableReducer';

const rootReducer = combineReducers({
  variable: variableReducer,
});

const store = createStore(rootReducer);

export default store;
