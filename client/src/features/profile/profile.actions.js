import axios from 'axios';
import {
  asyncActionStart,
  asyncActionError,
  asyncActionFinish,
} from '../async/async.actions';
import {
  SET_CURRENT_PROFILE,
  ADD_EXPERIENCE,
  DELETE_EXPERIENCE,
  ADD_EDUCATION,
  DELETE_EDUCATION,
  SET_PROFILES,
  SET_REPOSITORIES,
  CLEAR_PROFILE,
} from './profile.constants';
import { toastr } from 'react-redux-toastr';
import { logout, getAuthUser } from '../auth/auth.actions';
import { closeDrawer } from '../drawer/drawer.actions';
import { setDefaultAxios } from '../../app/utils/helper';
import { closeModal } from '../modal/modal.actions';
import { actionTypes } from '../../app/utils/config';

const { profile: profileAction } = actionTypes;

export const uploadProfileImage = file => async dispatch => {
  const formData = new FormData();
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  formData.append('image', file.originFileObj);

  dispatch(asyncActionStart(profileAction.UPLOAD_PROFILE_IMAGE));
  try {
    const res = await axios.post('/api/profile/me/upload', formData, config);
    const { profile } = res.data;

    dispatch({ type: SET_CURRENT_PROFILE, payload: { profile } });
    dispatch(getAuthUser());
    dispatch(getAuthProfile());
    dispatch(asyncActionFinish());
    dispatch(closeModal());
  } catch (err) {
    console.log(err);
    dispatch(asyncActionError());
  }
};

export const getProfiles = (authUserId = null) => async dispatch => {
  dispatch(asyncActionStart(profileAction.GET_PROFILES));

  try {
    const res = await axios.get('/api/profile');
    const profiles = res.data.profiles.filter(
      profile => profile.user._id !== authUserId
    );

    dispatch({ type: SET_PROFILES, payload: { profiles } });
    dispatch(asyncActionFinish());
  } catch (err) {
    console.log(err.response);
    dispatch(asyncActionError());
  }
};

export const getAuthProfile = history => async dispatch => {
  setDefaultAxios();
  dispatch(asyncActionStart(profileAction.GET_PROFILE));

  try {
    const res = await axios.get('/api/profile/me');
    const { profile } = res.data;

    dispatch({ type: SET_CURRENT_PROFILE, payload: { profile } });
    dispatch(asyncActionFinish());
    if (history) {
      history.push('/dashboard');
    }
  } catch (err) {
    if (
      err.response.data.msg === 'There is no profile for this user' &&
      history
    ) {
      history.push('/dashboard');
    }
    dispatch(asyncActionError());
  }
};

export const getProfile = userId => async dispatch => {
  setDefaultAxios();
  dispatch(asyncActionStart(profileAction.GET_PROFILE));

  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    const { profile } = res.data;

    dispatch({ type: SET_CURRENT_PROFILE, payload: { profile } });
    dispatch(asyncActionFinish());
  } catch (err) {
    dispatch(
      asyncActionError({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

export const getGithubRepositories = githubUsername => async dispatch => {
  dispatch(asyncActionStart(profileAction.GET_GITHUB_REPOSITORIES));

  try {
    const res = await axios.get(`/api/profile/github/${githubUsername}`);
    const repositories = res.data;

    dispatch({ type: SET_REPOSITORIES, payload: { repositories } });
    dispatch(asyncActionFinish());
  } catch (err) {
    dispatch({ type: SET_REPOSITORIES, payload: { repositories: [] } });
    dispatch(
      asyncActionError({
        msg: err.response.statusText,
        status: err.response.status,
      })
    );
  }
};

export const profileActions = (profileInfo, edit = false) => async dispatch => {
  dispatch(asyncActionStart(profileAction.PROFILE_ACTIONS));
  const successMessage = edit
    ? 'Your profile has been updated'
    : 'Your profile has been created';

  try {
    const res = await axios.post('/api/profile', profileInfo);
    const { profile } = res.data;

    dispatch(getGithubRepositories(profile.githubUsername));

    dispatch({ type: SET_CURRENT_PROFILE, payload: { profile } });
    dispatch(asyncActionFinish());
    dispatch(closeDrawer());
    toastr.success('Success', successMessage);
  } catch (err) {
    dispatch(asyncActionError(err));
    toastr.error('Oops', 'Something went wrong, please try again');
  }
};

export const addExperience = experience => async dispatch => {
  dispatch(asyncActionStart(profileAction.ADD_EXPERIENCE));

  try {
    const res = await axios.put('/api/profile/experience', experience);
    const { profile } = res.data;

    dispatch({
      type: ADD_EXPERIENCE,
      payload: { experience: profile.experience },
    });
    dispatch(asyncActionFinish());
    dispatch(closeDrawer());
    toastr.success('Success', 'Experience has been added');
  } catch (err) {
    dispatch(asyncActionError(err));
    toastr.error('Oops', 'Some thing went wrong, please try again');
  }
};

export const addEducation = education => async dispatch => {
  dispatch(asyncActionStart(profileAction.ADD_EDUCATION));

  try {
    const res = await axios.put('/api/profile/education', education);
    const { profile } = res.data;

    dispatch({
      type: ADD_EDUCATION,
      payload: { education: profile.education },
    });
    dispatch(asyncActionFinish());
    dispatch(closeDrawer());
    toastr.success('Success', 'Education has been added');
  } catch (err) {
    dispatch(asyncActionError(err));
    toastr.error('Oops', 'Some thing went wrong, please try again');
  }
};

export const deleteExperience = exId => async dispatch => {
  toastr.confirm('Are your sure you want to delete this experience?', {
    onOk: async () => {
      dispatch(asyncActionStart(profileAction.DELETE_EXPERIENCE, exId));

      try {
        await axios.delete(`/api/profile/experience/${exId}`);

        dispatch({ type: DELETE_EXPERIENCE, payload: { exId } });
        dispatch(asyncActionFinish());
        toastr.success('Success', 'Experience has been deleted!');
      } catch (err) {
        dispatch(asyncActionError(err));
        toastr.error('Oops', 'Some thing went wrong, please try again');
      }
    },
  });
};

export const deleteEducation = edId => dispatch => {
  toastr.confirm('Are your sure you want to delete this education?', {
    onOk: async () => {
      dispatch(asyncActionStart(profileAction.DELETE_EDUCATION, edId));

      try {
        await axios.delete(`/api/profile/education/${edId}`);

        dispatch({ type: DELETE_EDUCATION, payload: { edId } });
        dispatch(asyncActionFinish());
        toastr.success('Success', 'Education has been deleted!');
      } catch (err) {
        dispatch(asyncActionError(err));
        toastr.error('Oops', 'Some thing went wrong, please try again');
      }
    },
  });
};

export const deleteAccount = () => dispatch => {
  toastr.confirm('Are your sure? This can NOT be undone', {
    onOk: async () => {
      dispatch(asyncActionStart(profileAction.DELETE_ACCOUNT));

      try {
        await axios.put('/api/profile');

        dispatch(logout());
        dispatch(asyncActionFinish());
        toastr.success('Success', 'Your account has been deleted');
      } catch (err) {
        dispatch(asyncActionError(err));
        toastr.error('Oops', 'Some thing went wrong, please try again');
      }
    },
  });
};

export const clearProfile = () => ({ type: CLEAR_PROFILE });
