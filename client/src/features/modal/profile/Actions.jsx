import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from 'antd';
import ModalBase from './ModalBase';
import { UserIcon } from '../../../app/layout/common/Icons';
import ProfileAction from '../../profile/ProfileAction';

const { Text } = Typography;

function Actions(props) {
  const profile = useSelector(state => state.profile.current);

  return (
    <ModalBase
      title={profile ? 'Update your profile' : 'Create your profile'}
      description={
        <Text>
          <UserIcon /> Let's get some information to make your profile stand out
        </Text>
      }
    >
      <ProfileAction />
    </ModalBase>
  );
}

export default Actions;
