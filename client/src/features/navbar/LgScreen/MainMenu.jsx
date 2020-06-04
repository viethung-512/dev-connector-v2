import React from 'react';
import './style.css';
import UnAuthMenu from '../UnAuthMenu/UnAuthMenu';
import AuthMenu from '../AuthMenu/AuthMenu';

function MainMenu({ authenticated, login, register }) {
  authenticated = true;
  return (
    <div className='main-menu--lg'>
      {authenticated ? (
        <AuthMenu
          authUser={{ name: 'test', avatar: 'test' }}
          logout={() => console.log('logout')}
        />
      ) : (
        <UnAuthMenu login={login} register={register} />
      )}
    </div>
  );
}

export default MainMenu;
