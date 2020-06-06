import React from 'react';
import { Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { closeDrawer } from '../drawer.actions';
import MainMenu from '../../navbar/SmScreen/MainMenu';
import { openModal } from '../../modal/modal.actions';
import { logout } from '../../auth/auth.actions';

function MenuMobileDrawer(props) {
  const dispatch = useDispatch();
  const { authenticated, user } = useSelector(state => state.auth);

  const closeMenuMobile = () => dispatch(closeDrawer());
  const handleLogout = () => dispatch(logout());
  const handleRegister = () => {
    dispatch(openModal('Register'));
    dispatch(closeDrawer());
  };
  const handleLogin = () => {
    dispatch(openModal('Login'));
    dispatch(closeDrawer());
  };

  const smallScreen = window.innerWidth <= 320;

  return (
    <Drawer
      visible
      onClose={closeMenuMobile}
      width={smallScreen ? '100%' : 320}
      headerStyle={{ backgroundColor: '#fff', height: 64 }}
    >
      <MainMenu
        authUser={user}
        authenticated={authenticated}
        closeMenuMobile={closeMenuMobile}
        logout={handleLogout}
        register={handleRegister}
        login={handleLogin}
      />
    </Drawer>
  );
}

export default MenuMobileDrawer;
