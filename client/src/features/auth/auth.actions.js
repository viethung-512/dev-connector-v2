import axios from 'axios';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from '../async/async.actions';
import { closeModal } from '../modal/modal.actions';
import { setDefaultAxios } from '../../app/utils/helper';
import { SET_AUTH_USER, LOGOUT_USER } from './auth.constants';
import { CLEAR_PROFILE } from '../profile/profile.constants';
import { getAuthProfile } from '../profile/profile.actions';
import { ASYNC_ACTION_CLEAR } from '../async/async.constants';
import { actionTypes } from '../../app/utils/config';

const { auth: authAction } = actionTypes;

export const getAuthUser = () => async dispatch => {
  setDefaultAxios();

  dispatch(asyncActionStart(authAction.GET_AUTH_USER));

  try {
    const res = await axios.get('/api/auth');
    const { user } = res.data;

    dispatch({ type: SET_AUTH_USER, payload: { user } });
    dispatch(asyncActionFinish());
  } catch (err) {
    console.log(err);
    window.location.href = '/developers';
    dispatch(logout());
    dispatch(asyncActionError());
  }
};

export const login = (userCredentials, history) => async dispatch => {
  const body = JSON.stringify(userCredentials);
  console.log(axios.defaults.baseURL);

  try {
    dispatch(asyncActionStart(authAction.LOGIN));
    const res = await axios.post('/api/auth/login', body);
    const { token, user } = res.data;

    localStorage.setItem('token', token);

    dispatch({ type: SET_AUTH_USER, payload: { user } });
    dispatch(getAuthProfile());
    dispatch(asyncActionFinish());
    dispatch(closeModal());

    history.push('/dashboard');
  } catch (err) {
    console.error(err.response.data);
    dispatch(asyncActionError(err.response.data.error));
  }
};

export const register = (userCredentials, history) => async dispatch => {
  const body = JSON.stringify(userCredentials);

  try {
    dispatch(asyncActionStart(authAction.REGISTER));
    const res = await axios.post('/api/auth/register', body);
    const { token, user } = res.data;

    localStorage.setItem('token', token);

    dispatch({ type: SET_AUTH_USER, payload: { user } });
    dispatch(getAuthProfile());
    dispatch(asyncActionFinish());
    dispatch(closeModal());
    history.push('/dashboard');
  } catch (err) {
    console.error(err.response.data.errors);
    dispatch(asyncActionError(err.response.data.error));
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('token');
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: ASYNC_ACTION_CLEAR });
  dispatch({ type: LOGOUT_USER });
};

export const initUser = () => dispatch => {
  dispatch(getAuthUser());
  dispatch(getAuthProfile());
};
