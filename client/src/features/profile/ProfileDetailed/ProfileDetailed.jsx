import React, { useEffect, Fragment } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GithubRepos from './GithubRepos';
import {
  getProfile,
  getGithubRepositories,
  clearProfile,
  getAuthProfile,
} from '../profile.actions';
import { Spin } from 'antd';
import { LoadingIcon } from '../../../app/layout/common/Icons';
import Header from './Header/Header';
import Container from './Container/Container';
import { openDrawer } from '../../drawer/drawer.actions';
import NotFoundProfile from '../NotFoundProfile';
import { openModal } from '../../modal/modal.actions';

function ProfileDetailed(props) {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { type, loading } = useSelector(state => state.async);
  const profile = useSelector(state => state.profile.current);
  const repos = useSelector(state => state.profile.repositories);

  const githubUsername =
    profile && profile.githubUsername ? profile.githubUsername : null;
  const loadingRepos = type === 'getGithubRepositories' ? loading : false;
  const loadingProfile = type === 'getProfile' ? loading : false;

  const loadingDetail = loadingRepos || loadingProfile;

  useEffect(() => {
    if (userId) {
      dispatch(getProfile(userId));
    } else {
      dispatch(getAuthProfile());
    }

    return () => {
      dispatch(clearProfile());
    };

    // eslint-disable-next-line
  }, [userId]);

  useEffect(() => {
    if (githubUsername) {
      dispatch(getGithubRepositories(githubUsername));
    }

    // eslint-disable-next-line
  }, [profile, githubUsername]);

  const openProfileAction = () =>
    dispatch(openDrawer('ProfileAction', { profile }));
  const openUploadImageModal = () => dispatch(openModal('UploadProfileImage'));

  return (
    <div>
      <Spin indicator={LoadingIcon} spinning={loadingDetail}>
        <Header
          profile={profile}
          updateProfile={openProfileAction}
          isAuth={!userId}
          openUploadImageModal={openUploadImageModal}
        />

        {profile ? (
          <Fragment>
            <Container profile={profile} />
            {repos && repos.length > 0 && <GithubRepos repos={repos} />}
          </Fragment>
        ) : (
          <NotFoundProfile openProfileAction={openProfileAction} />
        )}
      </Spin>
    </div>
  );
}

export default ProfileDetailed;
