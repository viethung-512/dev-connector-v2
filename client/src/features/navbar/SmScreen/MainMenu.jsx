import React from 'react';
import './style.css';
import UnAuthMenu from '../UnAuthMenu/UnAuthMenu';
import AuthMenu from '../AuthMenu/AuthMenu';

function MainMenu({
  authenticated,
  login,
  register,
  logout,
  authUser,
  closeMenuMobile,
}) {
  return (
    <div className='main-menu--sm'>
      {authenticated ? (
        <AuthMenu
          mobile={true}
          authUser={authUser}
          logout={logout}
          closeMenuMobile={closeMenuMobile}
        />
      ) : (
        <UnAuthMenu
          login={login}
          register={register}
          mobile={true}
          closeMenuMobile={closeMenuMobile}
        />
      )}
    </div>
  );
}

export default MainMenu;
