import React from 'react';
import { Typography, Button } from 'antd';
import {
  UserIcon,
  UserCirCleIcon,
  TieIcon,
  EduIcon,
} from '../../../app/layout/common/Icons';

const { Title, Text } = Typography;

function DashboardHeader({
  user,
  addExperience,
  addEducation,
  profile,
  updateProfile,
}) {
  return (
    <div className='dashboard-header'>
      <Title className='dashboard-header__title'>Dashboard</Title>
      <Text className='dashboard-header__subtitle'>
        <UserIcon /> Welcome {user && user.name}
      </Text>
      {profile && (
        <div className='dashboard-header__actions'>
          <Button
            type='link'
            icon={<UserCirCleIcon />}
            className='dashboard-header__action'
            onClick={() => updateProfile(profile)}
          >
            <Text>Edit Profile</Text>
          </Button>
          <Button
            type='link'
            icon={<TieIcon />}
            className='dashboard-header__action'
            onClick={addExperience}
          >
            <Text>Add Experience</Text>
          </Button>
          <Button
            type='link'
            icon={<EduIcon />}
            className='dashboard-header__action'
            onClick={addEducation}
          >
            <Text>Add Education</Text>
          </Button>
        </div>
      )}
    </div>
  );
}

export default DashboardHeader;
