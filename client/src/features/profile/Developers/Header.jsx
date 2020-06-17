import React from 'react';
import { Typography, PageHeader } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { breadcrumbRenderItem } from '../../../app/utils/helper';

const { Title, Text } = Typography;

function Header({ authUserId }) {
  const routes = authUserId
    ? [
        {
          path: 'dashboard',
          breadcrumbName: 'Dashboard',
        },
        {
          path: 'developers',
          breadcrumbName: 'Developers Profile',
        },
      ]
    : [
        {
          path: 'developers',
          breadcrumbName: 'Developers',
        },
      ];

  return (
    <div className='developers-page__header'>
      <PageHeader
        style={{ paddingLeft: 0, paddingRight: 0 }}
        title={
          <Title className='primary article-detail__title'>Developers</Title>
        }
        breadcrumb={{ itemRender: breadcrumbRenderItem, routes }}
      />
      <Text className='developers-page__header-subtitle'>
        <SettingOutlined /> Browse and connect with developers
      </Text>
    </div>
  );
}

export default Header;
