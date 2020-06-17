import React from 'react';
import { Typography, PageHeader } from 'antd';
import { UserIcon } from '../../../app/layout/common/Icons';
import { breadcrumbRenderItem } from '../../../app/utils/helper';

const { Title, Text } = Typography;

function Heder(props) {
  const routes = [
    {
      path: 'dashboard',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'posts',
      breadcrumbName: 'Posts',
    },
  ];

  return (
    <div className='post__heder'>
      <PageHeader
        style={{ paddingLeft: 0, paddingRight: 0 }}
        title={<Title className='post__header-title'>Posts</Title>}
        breadcrumb={{ itemRender: breadcrumbRenderItem, routes }}
      />
      <Text className='post__header-subtitle'>
        <UserIcon /> Welcome to the community
      </Text>
    </div>
  );
}

export default Heder;
