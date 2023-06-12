import { SET_VARIABLE, SET_VALOR_RS } from '../actions/actiontypes';

const initialState = {
  value: null,
  valorRS: 0,
};

const variableReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VARIABLE:
      return {
        ...state,
        value: action.payload,
      };
    case SET_VALOR_RS:
      return {
        ...state,
        valorRS: action.payload,
      };
    default:
      return state;
  }
};



export default variableReducer;
