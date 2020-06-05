import React from 'react';
import './style.css';
import { Divider } from 'antd';
import HeaderTop from './HeaderTop';
import HeaderContainer from './HeaderContainer';

const Header = ({ profile, updateProfile, isAuth, openUploadImageModal }) => {
  return (
    <div className='profile-detailed__header'>
      <HeaderTop
        profile={profile}
        updateProfile={updateProfile}
        isAuth={isAuth}
      />
      <Divider />
      {profile && (
        <HeaderContainer
          profile={profile}
          isAuth={isAuth}
          openUploadImageModal={openUploadImageModal}
        />
      )}
    </div>
  );
};

export default Header;
