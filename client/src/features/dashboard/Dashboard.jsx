import React, { useEffect } from 'react';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import { Spin, Divider } from 'antd';
import { LoadingIcon } from '../../app/layout/common/Icons';
import DashboardHeader from './Header/DashboardHeader';
import DashboardContainer from './Container/DashboardContainer';
import DashboardAction from './Actions/DashboardActions';
import {
  deleteExperience,
  deleteEducation,
  deleteAccount,
  clearProfile,
  getAuthProfile,
} from '../profile/profile.actions';
import { openDrawer } from '../drawer/drawer.actions';
import NotFoundProfile from '../profile/NotFoundProfile';
import { actionTypes } from '../../app/utils/config';

function Dashboard(props) {
  const dispatch = useDispatch();
  const { loading, type, elmId } = useSelector(state => state.async);

  const user = useSelector(state => state.auth.user);
  const profile = useSelector(state => state.profile.current);
  const experience = profile ? profile.experience : [];
  const education = profile ? profile.education : [];

  useEffect(() => {
    dispatch(getAuthProfile());
    return () => {
      dispatch(clearProfile());
    };

    // eslint-disable-next-line
  }, []);

  const { profile: profileAction } = actionTypes;

  const getProfileLoading =
    type === profileAction.GET_PROFILE ? loading : false;
  const exDeleteLoading =
    type === profileAction.DELETE_EXPERIENCE ? loading : false;
  const edDeleteLoading =
    type === profileAction.DELETE_EDUCATION ? loading : false;
  const accDeleteLoading =
    type === profileAction.DELETE_ACCOUNT ? loading : false;

  const handleAddExperience = () => dispatch(openDrawer('ExperienceAction'));
  const handleAddEducation = () => dispatch(openDrawer('EducationAction'));
  const handleDeleteExperience = exId => dispatch(deleteExperience(exId));
  const handleDeleteEducation = edId => dispatch(deleteEducation(edId));
  const handleDeleteAccount = () => dispatch(deleteAccount());

  const openProfileAction = () =>
    dispatch(openDrawer('ProfileAction', { profile }));

  return (
    <Spin spinning={getProfileLoading} indicator={LoadingIcon}>
      <div className='dashboard'>
        <DashboardHeader
          user={user}
          addExperience={handleAddExperience}
          addEducation={handleAddEducation}
          profile={profile}
          updateProfile={openProfileAction}
        />
        <Divider />
        {profile ? (
          <DashboardContainer
            experience={experience}
            education={education}
            addExperience={handleAddExperience}
            addEducation={handleAddEducation}
            deleteExperience={handleDeleteExperience}
            deleteEducation={handleDeleteEducation}
            exDeleteLoading={exDeleteLoading}
            edDeleteLoading={edDeleteLoading}
            elmId={elmId}
          />
        ) : (
          <NotFoundProfile openProfileAction={openProfileAction} />
        )}

        <Divider />
        <DashboardAction
          deleteAccount={handleDeleteAccount}
          loading={accDeleteLoading}
        />
      </div>
    </Spin>
  );
}

export default Dashboard;
