import React from 'react';
import { Card, List } from 'antd';
import Title from 'antd/lib/typography/Title';
import ExperienceItem from './ExperienceItem';

function Experience({ experience }) {
  return (
    <Card
      hoverable
      className='profile-detailed__container-experience'
      bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}
      title={
        <Title
          level={3}
          className='profile-detailed__container-experience-title'
        >
          Experience
        </Title>
      }
    >
      <List
        dataSource={experience}
        renderItem={ex => (
          <List.Item>
            <ExperienceItem ex={ex} />
          </List.Item>
        )}
      />
    </Card>
  );
}

export default Experience;
