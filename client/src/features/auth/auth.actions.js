// import axios from 'axios';
// import {
//   asyncActionStart,
//   asyncActionFinish,
//   asyncActionError,
// } from '../async/async.actions';
// import { closeModal } from '../modal/modal.actions';
// import { setAuthToken } from '../../app/utils/helper';
// import { SET_AUTH_USER, LOGOUT_USER } from './auth.constants';
// import { CLEAR_PROFILE } from '../profile/profile.constants';
// import { getAuthProfile } from '../profile/profile.actions';

// export const loadAuthenticatedUser = () => async dispatch => {
//   setAuthToken();

//   try {
//     const res = await axios.get('/api/auth');
//     dispatch({ type: SET_AUTH_USER, payload: { user: res.data } });
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const login = (userCredentials, history) => async dispatch => {
//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };
//   const body = JSON.stringify(userCredentials);

//   try {
//     dispatch(asyncActionStart());
//     const res = await axios.post('/api/auth', body, config);
//     const { token } = res.data;

//     localStorage.setItem('token', token);

//     dispatch(loadAuthenticatedUser());
//     dispatch(getAuthProfile(history));
//     dispatch(asyncActionFinish());
//     dispatch(closeModal());
//   } catch (err) {
//     console.error(err.response.data.errors);
//     dispatch(asyncActionError(err.response.data.errors));
//   }
// };

// export const register = (userCredentials, history) => async dispatch => {
//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };
//   const body = JSON.stringify(userCredentials);

//   try {
//     dispatch(asyncActionStart());
//     const res = await axios.post('/api/users', body, config);
//     const { token } = res.data;

//     localStorage.setItem('token', token);

//     dispatch(loadAuthenticatedUser());
//     dispatch(getAuthProfile(history));
//     dispatch(asyncActionFinish());
//     dispatch(closeModal());
//   } catch (err) {
//     console.error(err.response.data.errors);
//     dispatch(asyncActionError(err.response.data.errors));
//   }
// };

// export const logout = () => dispatch => {
//   localStorage.removeItem('token');
//   dispatch({ type: CLEAR_PROFILE });
//   dispatch({ type: LOGOUT_USER });
// };
