import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from 'antd';
import ProfileActionsForm from '../../profile/ProfileActionForm';
import DrawerBase from './DrawerBase';
import { UserIcon } from '../../../app/layout/common/Icons';

const { Text } = Typography;

function ProfileActions(props) {
  const profile = useSelector(({ drawer }) =>
    drawer && drawer.drawerProps && drawer.drawerProps.profile
      ? drawer.drawerProps.profile
      : null
  );

  return (
    <DrawerBase
      title={profile ? 'Update your profile' : 'Create your profile'}
      description={
        <Text>
          <UserIcon /> Let's get some information to make your profile stand out
        </Text>
      }
    >
      <ProfileActionsForm profile={profile} />
    </DrawerBase>
  );
}

export default ProfileActions;
