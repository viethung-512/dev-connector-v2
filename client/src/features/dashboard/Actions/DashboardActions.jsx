import React from 'react';
import { Button } from 'antd';
import { UserDeleteOutlined } from '@ant-design/icons';

function DashboardActions({ deleteAccount, loading }) {
  return (
    <div className='dashboard-actions'>
      <Button
        icon={<UserDeleteOutlined />}
        danger
        type='primary'
        size='large'
        onClick={deleteAccount}
        loading={loading}
      >
        Delete my account
      </Button>
    </div>
  );
}

export default DashboardActions;
