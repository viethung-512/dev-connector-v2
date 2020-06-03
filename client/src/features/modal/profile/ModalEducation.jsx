import React from 'react';
import { Typography } from 'antd';
import EducationForm from '../../profile/EducationForm';
import { EduIcon } from '../../../app/layout/common/Icons';
import ModalBase from './ModalBase';

const { Text } = Typography;

function ModalEducation(props) {
  return (
    <ModalBase
      title='Add Your Education'
      description={
        <Text>
          <EduIcon /> Add any school, bootcamp, etc that you have attended
        </Text>
      }
    >
      <EducationForm />
    </ModalBase>
  );
}

export default ModalEducation;
