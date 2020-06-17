import React from 'react';
import { UserDeleteOutlined } from '@ant-design/icons';

import LoadingButton from '../../../app/layout/common/loading/LoadingButton';

function DashboardActions({ deleteAccount, loadingTypes }) {
  return (
    <div className='dashboard-actions'>
      <LoadingButton
        icon={<UserDeleteOutlined />}
        danger
        type='primary'
        size='large'
        onClick={deleteAccount}
        loadingTypes={loadingTypes}
      >
        Delete my account
      </LoadingButton>
    </div>
  );
}

export default DashboardActions;
