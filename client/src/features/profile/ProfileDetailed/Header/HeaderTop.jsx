import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

function HeaderTop({ updateProfile, profile, isAuth }) {
  return (
    <Space>
      <Link to='/developers'>
        <Button type='default' icon={<ArrowLeftOutlined />}>
          Back To Profiles
        </Button>
      </Link>
      {isAuth && profile && (
        <Fragment>
          <Button type='link' className='btn btn--dark' onClick={updateProfile}>
            Edit Profile
          </Button>
        </Fragment>
      )}
    </Space>
  );
}

export default HeaderTop;
