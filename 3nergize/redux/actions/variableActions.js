// src/redux/actions/variableActions.js
import { SET_VARIABLE, SET_VALOR_RS } from './actiontypes';

export const setVariable = (value) => {
  return {
    type: SET_VARIABLE,
    payload: value,
  };
};

export const setValorRS = (value) => {
  return {
    type: SET_VALOR_RS,
    payload: value,
  };
};
