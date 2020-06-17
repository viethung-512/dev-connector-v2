import React, { useEffect } from 'react';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import { Divider } from 'antd';
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
import LoadingGrid from '../../app/layout/common/loading/LoadingGrid';

function Dashboard(props) {
  const dispatch = useDispatch();

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

  const profileAction = actionTypes.profile;

  const handleAddExperience = () => dispatch(openDrawer('ExperienceAction'));
  const handleAddEducation = () => dispatch(openDrawer('EducationAction'));
  const handleDeleteExperience = exId => dispatch(deleteExperience(exId));
  const handleDeleteEducation = edId => dispatch(deleteEducation(edId));
  const handleDeleteAccount = () => dispatch(deleteAccount());

  const openProfileAction = () =>
    dispatch(openDrawer('ProfileAction', { profile }));

  return (
    <LoadingGrid loadingTypes={[profileAction.GET_PROFILE]}>
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
            exLoadingTypes={[profileAction.DELETE_EXPERIENCE]}
            edLoadingTypes={[profileAction.DELETE_EDUCATION]}
          />
        ) : (
          <NotFoundProfile openProfileAction={openProfileAction} />
        )}

        <Divider />
        <DashboardAction
          deleteAccount={handleDeleteAccount}
          loadingTypes={[profileAction.DELETE_ACCOUNT]}
        />
      </div>
    </LoadingGrid>
  );
}

export default Dashboard;
