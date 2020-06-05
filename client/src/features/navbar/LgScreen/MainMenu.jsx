import React from 'react';
import './style.css';
import UnAuthMenu from '../UnAuthMenu/UnAuthMenu';
import AuthMenu from '../AuthMenu/AuthMenu';

function MainMenu({ authenticated, login, register, authUser, logout }) {
  return (
    <div className='main-menu--lg'>
      {authenticated ? (
        <AuthMenu authUser={authUser} logout={logout} />
      ) : (
        <UnAuthMenu login={login} register={register} />
      )}
    </div>
  );
}

export default MainMenu;
