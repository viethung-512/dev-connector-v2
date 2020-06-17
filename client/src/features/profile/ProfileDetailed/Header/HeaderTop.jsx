import React, { Fragment } from 'react';
import { Button, Space, PageHeader } from 'antd';
import { breadcrumbRenderItem } from '../../../../app/utils/helper';

function HeaderTop({ updateProfile, profile, isAuth }) {
  const routes = isAuth
    ? [
        {
          path: 'dashboard',
          breadcrumbName: 'Dashboard',
        },
        {
          path: 'developers',
          breadcrumbName: 'Developers',
        },
        {
          path: profile ? `/profile/${profile.user._id}` : '',
          breadcrumbName: profile ? profile.user.name : '',
        },
      ]
    : [
        {
          path: 'developers',
          breadcrumbName: 'Developers',
        },
        {
          path: profile ? `/profile/${profile.user._id}` : '',
          breadcrumbName: profile ? profile.user.name : '',
        },
      ];
  return (
    <Fragment>
      <PageHeader
        style={{ paddingLeft: 0, paddingRight: 0 }}
        title={
          <Space>
            {isAuth && profile && (
              <Fragment>
                <Button
                  type='link'
                  className='btn btn--dark'
                  onClick={updateProfile}
                >
                  Edit Profile
                </Button>
              </Fragment>
            )}
          </Space>
        }
        breadcrumb={{ itemRender: breadcrumbRenderItem, routes }}
      />
    </Fragment>
  );
}

export default HeaderTop;
