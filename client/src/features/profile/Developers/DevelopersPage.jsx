import React, { useEffect } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import Profiles from './Profiles';
import { getProfiles } from '../profile.actions';
import Header from './Header';
import { Spin } from 'antd';
import { LoadingIcon } from '../../../app/layout/common/Icons';
import { actionTypes } from '../../../app/utils/config';

function DevelopersPage(props) {
  const dispatch = useDispatch();
  const { _id: authUserId } = useSelector(state => state.auth.user);
  const profiles = useSelector(state => state.profile.profiles);
  const { type, loading } = useSelector(state => state.async);

  const { profile: profileAction } = actionTypes;

  const getAuthProfileLoading =
    type === profileAction.GET_PROFILE ? loading : false;
  const getProfilesLoading =
    type === profileAction.GET_PROFILES ? loading : false;

  const dashboardLoading = getAuthProfileLoading || getProfilesLoading;

  useEffect(() => {
    if (authUserId) {
      dispatch(getProfiles(authUserId));
    } else {
      dispatch(getProfiles());
    }

    // eslint-disable-next-line
  }, [authUserId]);

  return (
    <Spin spinning={dashboardLoading} indicator={LoadingIcon}>
      <Header />
      <Profiles profiles={profiles} />
    </Spin>
  );
}

export default DevelopersPage;
