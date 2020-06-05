import React from 'react';
import { Typography } from 'antd';
import { UserIcon } from '../../../app/layout/common/Icons';

const { Title, Text } = Typography;

function Heder(props) {
  return (
    <div className='post__heder'>
      <Title className='post__header-title'>Posts</Title>
      <Text className='post__header-subtitle'>
        <UserIcon /> Welcome to the community
      </Text>
    </div>
  );
}

export default Heder;
