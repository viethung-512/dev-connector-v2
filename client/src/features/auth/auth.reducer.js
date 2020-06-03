import { SET_AUTH_USER, LOGOUT_USER } from './auth.constants';

const token = localStorage.getItem('token');

const authReducerInitialState = {
  authenticated: token ? true : false,
  user: {},
};
const authReducer = (state = authReducerInitialState, { type, payload }) => {
  switch (type) {
    case SET_AUTH_USER:
      return {
        ...state,
        authenticated: true,
        user: payload.user,
      };
    case LOGOUT_USER:
      return authReducerInitialState;
    default:
      return state;
  }
};

export default authReducer;
