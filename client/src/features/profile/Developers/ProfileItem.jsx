import React from 'react';
import { Card, Avatar, Typography, Button, List } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

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
              src={avatar}
              alt={name}
              style={{ border: '1px solid rgba(0, 0, 0, 0.25)' }}
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
