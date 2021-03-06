import React from 'react';
import './style.css';
import { NavLink, Link } from 'react-router-dom';
import { Menu, Dropdown, Typography } from 'antd';
import {
  LogoutOutlined,
  ProfileOutlined,
  FormOutlined,
} from '@ant-design/icons';
import Avatar from '../../../app/layout/common/Avatar';
import { defaultName } from '../../../app/utils/config';

function AuthMenu({ mobile = false, authUser, logout, closeMenuMobile }) {
  const { name = defaultName.USER, avatar } = authUser;

  const menuClassName = mobile ? 'menubar--sm' : 'menubar--lg';
  const menuItemClassName = mobile ? 'menubar-item--sm' : 'menubar-item--lg';
  const menuItemLinkClassName = mobile
    ? 'menubar-item-link--sm'
    : 'menubar-item-link--lg';

  const useMenu = (
    <Menu mode='vertical'>
      <Menu.Item
        key='create-article'
        icon={<FormOutlined />}
        onClick={closeMenuMobile}
      >
        <Link to='/blog/create'>
          <Typography.Text>Create new Article</Typography.Text>
        </Link>
      </Menu.Item>
      <Menu.Item
        key='profile'
        icon={<ProfileOutlined />}
        onClick={closeMenuMobile}
      >
        <Link to='/profile/me'>
          <Typography.Text>My Profile</Typography.Text>
        </Link>
      </Menu.Item>
      <Menu.Item key='logout' icon={<LogoutOutlined />} onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );
  return (
    <Menu className={menuClassName} mode={mobile ? 'vertical' : 'horizontal'}>
      <Menu.Item
        className={menuItemClassName}
        key='developer'
        onClick={closeMenuMobile}
      >
        <NavLink
          to='/developers'
          className={menuItemLinkClassName}
          activeClassName='menubar-item-link--active'
        >
          Developers
        </NavLink>
      </Menu.Item>
      <Menu.Item
        className={menuItemClassName}
        key='blog'
        onClick={closeMenuMobile}
      >
        <NavLink
          to='/blog'
          className={menuItemLinkClassName}
          activeClassName='menubar-item-link--active'
        >
          Blog
        </NavLink>
      </Menu.Item>
      <Menu.Item
        className={menuItemClassName}
        key='posts'
        onClick={closeMenuMobile}
      >
        <NavLink
          to='/posts'
          className={menuItemLinkClassName}
          activeClassName='menubar-item-link--active'
        >
          Posts
        </NavLink>
      </Menu.Item>
      <Menu.Item
        className={menuItemClassName}
        key='dashboard'
        onClick={closeMenuMobile}
      >
        <NavLink
          to='/dashboard'
          className={menuItemLinkClassName}
          activeClassName='menubar-item-link--active'
        >
          Dashboard
        </NavLink>
      </Menu.Item>
      <Menu.Item
        className={menuItemClassName}
        key='auth'
        style={mobile ? null : { color: '#fff' }}
      >
        <Dropdown overlay={useMenu} trigger={['click', 'hover']}>
          <span className='auth-menu'>
            <Avatar
              src={avatar}
              alt={name}
              style={{ marginRight: 8 }}
              className='avatar--header avatar__image'
            />
            {name}
          </span>
        </Dropdown>
      </Menu.Item>
    </Menu>
  );
}

export default AuthMenu;
