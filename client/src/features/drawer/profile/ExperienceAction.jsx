import React from 'react';
import { Typography } from 'antd';
import { BranchesOutlined } from '@ant-design/icons';
import ExperienceForm from '../../profile/ExperienceForm';
import DrawerBase from './DrawerBase';

const { Text } = Typography;

function ExperienceAction(props) {
  return (
    <DrawerBase
      title='Add An Experience'
      description={
        <Text>
          <BranchesOutlined style={{ color: '#17a2b8' }} /> Add any
          developer/programming positions that you have had in the past
        </Text>
      }
    >
      <ExperienceForm />
    </DrawerBase>
  );
}

export default ExperienceAction;
