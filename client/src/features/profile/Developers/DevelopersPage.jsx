import React, { useEffect } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import Profiles from './Profiles';
import { getProfiles } from '../profile.actions';
import Header from './Header';
import { actionTypes } from '../../../app/utils/config';
import LoadingGrid from '../../../app/layout/common/loading/LoadingGrid';

function DevelopersPage(props) {
  const dispatch = useDispatch();
  const { _id: authUserId } = useSelector(state => state.auth.user);
  const profiles = useSelector(state => state.profile.profiles);

  const { profile: profileAction } = actionTypes;

  useEffect(() => {
    if (authUserId) {
      dispatch(getProfiles(authUserId));
    } else {
      dispatch(getProfiles());
    }

    // eslint-disable-next-line
  }, [authUserId]);

  return (
    <LoadingGrid
      loadingTypes={[profileAction.GET_PROFILES, profileAction.GET_PROFILE]}
    >
      <Header authUserId={authUserId} />
      <Profiles profiles={profiles} />
    </LoadingGrid>
  );
}

export default DevelopersPage;
