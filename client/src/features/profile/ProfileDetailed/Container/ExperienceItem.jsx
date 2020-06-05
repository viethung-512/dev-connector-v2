import React from 'react';
import { Typography } from 'antd';
import { formatDate } from '../../../../app/utils/helper';

const { Title, Text } = Typography;

const ExperienceItem = ({ ex }) => {
  return (
    <div>
      <Title level={4}>{ex.company}</Title>
      <Text>
        ({formatDate(ex.from)} - {ex.to ? formatDate(ex.to) : 'Now'})
      </Text>
      {ex.title && (
        <div style={{ marginTop: 8 }}>
          <Text strong>Position:</Text>
          <Text> {ex.title}</Text>
        </div>
      )}
      {ex.description && (
        <div>
          <Text strong>Description:</Text>
          <Text>{ex.description}</Text>
        </div>
      )}
    </div>
  );
};

export default ExperienceItem;
