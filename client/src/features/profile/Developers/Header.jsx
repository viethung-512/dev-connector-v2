import React from 'react';
import { Typography } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

function Header(props) {
  return (
    <div className='developers-page__header'>
      <Title className='developers-page__header-title'>Developers</Title>
      <Text className='developers-page__header-subtitle'>
        <SettingOutlined /> Browse and connect with developers
      </Text>
    </div>
  );
}

export default Header;
