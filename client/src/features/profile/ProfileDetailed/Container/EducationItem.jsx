import React from 'react';
import { Typography } from 'antd';
import { formatDate } from '../../../../app/utils/helper';

const { Title, Text } = Typography;

const EducationItem = ({ ed }) => {
  return (
    <div>
      <Title level={4}>{ed.school}</Title>
      <Text>
        ({formatDate(ed.from)} - {ed.to ? formatDate(ed.to) : 'Now'})
      </Text>
      {ed.degree && (
        <div style={{ marginTop: 8 }}>
          <Text strong>Degree:</Text>
          <Text> {ed.degree}</Text>
        </div>
      )}
      {ed.fieldOfStudy && (
        <div>
          <Text strong>Field of Study:</Text>
          <Text> {ed.fieldOfStudy}</Text>
        </div>
      )}
      {ed.description && (
        <div>
          <Text strong>Description:</Text>
          <Text> {ed.description}</Text>
        </div>
      )}
    </div>
  );
};

export default EducationItem;
