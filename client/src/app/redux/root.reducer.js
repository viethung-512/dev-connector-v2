import { combineReducers } from 'redux';

import asyncReducer from '../../features/async/async.reducer';
import drawerReducer from '../../features/drawer/drawer.reducer';
import modalReducer from '../../features/modal/modal.reducer';
import { reducer as toastrReducer } from 'react-redux-toastr';
import authReducer from '../../features/auth/auth.reducer';
import profileReducer from '../../features/profile/profile.reducer';
import postReducer from '../../features/post/post.reducer';

export default combineReducers({
  async: asyncReducer,
  drawer: drawerReducer,
  modal: modalReducer,
  toastr: toastrReducer,
  auth: authReducer,
  profile: profileReducer,
  post: postReducer,
});
