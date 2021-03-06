import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Button, Typography } from 'antd';
import CodeFilled from '@ant-design/icons/CodeFilled';
import MenuOutlined from '@ant-design/icons/MenuOutlined';
import { openDrawer } from '../drawer/drawer.actions';
import MainMenu from './LgScreen/MainMenu';
import { openModal } from '../modal/modal.actions';
import { logout } from '../auth/auth.actions';

const { Header } = Layout;
const { Text } = Typography;

function Navbar(props) {
  const dispatch = useDispatch();
  const { authenticated, user } = useSelector(state => state.auth);

  const openMenuMobile = () => dispatch(openDrawer('MenuMobile'));
  const handleRegister = () => dispatch(openModal('Register'));
  const handleLogin = () => dispatch(openModal('Login'));
  const handleLogout = () => dispatch(logout());

  return (
    <Header className='header'>
      <Link className='logo' to='/'>
        <CodeFilled className='logo__icon' />
        <Text className='logo__text'>DevConnector</Text>
      </Link>
      <MainMenu
        authUser={user}
        authenticated={authenticated}
        login={handleLogin}
        register={handleRegister}
        logout={handleLogout}
      />
      <Button
        className='menu-mobile-btn'
        icon={<MenuOutlined />}
        onClick={openMenuMobile}
      />
    </Header>
  );
}

export default Navbar;
