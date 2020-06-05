import React from 'react';
import { Typography, Button } from 'antd';

const { Title } = Typography;

const NotFoundProfile = ({ openProfileAction }) => {
  return (
    <div>
      <Title level={4}>
        You haven't yet setup a profile, please add some info
      </Title>
      <Button type='primary' onClick={openProfileAction}>
        Create a new profile
      </Button>
    </div>
  );
};

export default NotFoundProfile;
