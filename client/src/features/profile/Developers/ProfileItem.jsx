import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Avatar, Typography, Button, List } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { defaultImages } from '../../../app/utils/config';

const { Title, Text } = Typography;

const Skill = ({ skill }) => (
  <Text className='profile__skills-item'>
    <CheckOutlined /> {skill}
  </Text>
);

function ProfileItem({
  profile: {
    status,
    company,
    user: { _id, avatar, name },
    skills,
  },
}) {
  const description = `${status} at ${company}`;
  return (
    <Card bodyStyle={{ display: 'flex' }}>
      <Card.Meta
        className='profile'
        style={{ flex: 3 }}
        avatar={
          <div className='avatar'>
            <Avatar
              size={150}
              src={avatar || defaultImages.USER}
              alt={name}
              className='avatar__image'
            />
          </div>
        }
        title={
          <div className='profile__header'>
            <Title level={4} className='profile__header-title'>
              {name}
            </Title>
            <Text className='profile__header-subtitle'>{description}</Text>
          </div>
        }
        description={
          <div className='profile__description'>
            <Link to={`/profile/${_id}`}>
              <Button type='primary'>View Profile</Button>
            </Link>
          </div>
        }
      />
      {skills && skills.length > 0 && (
        <Card.Meta
          className='skills'
          style={{ flex: 1 }}
          description={
            <List
              dataSource={skills}
              renderItem={skill => <Skill skill={skill} />}
            />
          }
        />
      )}
    </Card>
  );
}

export default ProfileItem;
