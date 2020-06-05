import React from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { Typography, Drawer } from 'antd';
import { closeDrawer } from '../drawer.actions';

const { Title, Text } = Typography;

function DrawerBase({ title, description, children }) {
  const dispatch = useDispatch();

  const handleClose = () => dispatch(closeDrawer());

  const header = (
    <div className='drawer-header'>
      <Title level={1} className='drawer-title'>
        {title}
      </Title>
      <Text className='drawer-description'>{description}</Text>
    </div>
  );

  const smallScreen = window.innerWidth <= 600;

  return (
    <Drawer
      visible
      onClose={handleClose}
      title={header}
      width={smallScreen ? '100%' : 600}
      footer={null}
      destroyOnClose={true}
    >
      {children}
    </Drawer>
  );
}

export default DrawerBase;
