import React from 'react';
import './style.css';
import UnAuthMenu from '../UnAuthMenu/UnAuthMenu';

function MainMenu({ authenticated, login, register }) {
  authenticated = false;
  return (
    <div className='main-menu--sm'>
      {authenticated ? (
        <div>auth</div>
      ) : (
        <UnAuthMenu login={login} register={register} mobile={true} />
      )}
    </div>
  );
}

export default MainMenu;
