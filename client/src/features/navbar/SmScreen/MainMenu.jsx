import React from 'react';
import './style.css';
import UnAuthMenu from '../UnAuthMenu/UnAuthMenu';
import AuthMenu from '../AuthMenu/AuthMenu';

function MainMenu({ authenticated, login, register }) {
  authenticated = true;
  return (
    <div className='main-menu--sm'>
      {authenticated ? (
        <AuthMenu
          mobile={true}
          authUser={{ name: 'test', avatar: 'test' }}
          logout={() => console.log('logout')}
        />
      ) : (
        <UnAuthMenu login={login} register={register} mobile={true} />
      )}
    </div>
  );
}

export default MainMenu;
