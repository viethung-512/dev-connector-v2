import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';

function UnAuthMenu({ mobile = false, register, login, closeMenuMobile }) {
  const menuClassName = mobile ? 'menubar--sm' : 'menubar--lg';
  const menuItemClassName = mobile ? 'menubar-item--sm' : 'menubar-item--lg';
  const menuItemLinkClassName = mobile
    ? 'menubar-item-link--sm'
    : 'menubar-item-link--lg';

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
        key='register'
        onClick={register}
      >
        Register
      </Menu.Item>
      <Menu.Item className={menuItemClassName} key='login' onClick={login}>
        Login
      </Menu.Item>
    </Menu>
  );
}

export default UnAuthMenu;
