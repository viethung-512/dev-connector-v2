import React from 'react';
import { Typography } from 'antd';
import EducationForm from '../../profile/EducationForm';
import { EduIcon } from '../../../app/layout/common/Icons';
import DrawerBase from './DrawerBase';

const { Text } = Typography;

function EducationAction(props) {
  return (
    <DrawerBase
      title='Add Your Education'
      description={
        <Text>
          <EduIcon /> Add any school, bootcamp, etc that you have attended
        </Text>
      }
    >
      <EducationForm />
    </DrawerBase>
  );
}

export default EducationAction;
