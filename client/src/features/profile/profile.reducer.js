import {
  SET_CURRENT_PROFILE,
  ADD_EXPERIENCE,
  DELETE_EXPERIENCE,
  ADD_EDUCATION,
  DELETE_EDUCATION,
  CLEAR_PROFILE,
  SET_PROFILES,
  SET_REPOSITORIES,
} from './profile.constants';

const profileReducerInitialState = {
  current: null,
  profiles: [],
  repositories: [],
};

const profileReducer = (
  state = profileReducerInitialState,
  { type, payload }
) => {
  switch (type) {
    case SET_CURRENT_PROFILE:
      return {
        ...state,
        current: payload.profile,
      };
    case SET_PROFILES:
      return {
        ...state,
        profiles: payload.profiles,
      };
    case SET_REPOSITORIES:
      return {
        ...state,
        repositories: payload.repositories,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        current: null,
        repositories: [],
      };
    case ADD_EXPERIENCE:
      return {
        ...state,
        current: {
          ...state.current,
          experience: payload.experience,
        },
      };
    case DELETE_EXPERIENCE:
      return {
        ...state,
        current: {
          ...state.current,
          experience: state.current.experience.filter(
            ex => ex._id !== payload.exId
          ),
        },
      };
    case ADD_EDUCATION:
      return {
        ...state,
        current: {
          ...state.current,
          education: payload.education,
        },
      };
    case DELETE_EDUCATION:
      return {
        ...state,
        current: {
          ...state.current,
          education: state.current.education.filter(
            ed => ed._id !== payload.edId
          ),
        },
      };
    default:
      return state;
  }
};

export default profileReducer;
