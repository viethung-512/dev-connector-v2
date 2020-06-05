import React from 'react';
import { Card, List, Typography } from 'antd';
import EducationItem from './EducationItem';

const { Title } = Typography;

function Education({ education }) {
  return (
    <Card
      hoverable
      className='profile-detailed__container-education'
      bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}
      title={
        <Title
          level={3}
          className='profile-detailed__container-education-title'
        >
          Education
        </Title>
      }
    >
      <List
        dataSource={education}
        renderItem={ed => (
          <List.Item>
            <EducationItem ed={ed} />
          </List.Item>
        )}
      />
    </Card>
  );
}

export default Education;
