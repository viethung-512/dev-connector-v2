import React from 'react';
import { Card, Typography, Tag } from 'antd';

const { Title, Text } = Typography;

function RepoItem({ repo }) {
  return (
    <Card
      bordered
      bodyStyle={{ display: 'flex', width: '100%' }}
      style={{ width: '100%' }}
    >
      <Card.Meta
        style={{ flex: 1 }}
        title={
          <a href={repo.html_url} style={{ display: 'block', width: '100%' }}>
            <Title
              level={4}
              className='github-item__title'
              ellipsis={{ rows: 1 }}
            >
              {repo.name}
            </Title>
          </a>
        }
        description={
          <Text className='github-item__description'>{repo.description}</Text>
        }
      />
      <Card.Meta
        description={
          <Text className='github-tags'>
            <Tag className='github-tag github-tag--stars'>Stars: 44</Tag>
            <Tag className='github-tag github-tag--watchers'>
              Watchers: {repo.watchers}
            </Tag>
            <Tag className='github-tag github-tag--forks'>
              Forks: {repo.forks}
            </Tag>
          </Text>
        }
      />
    </Card>
  );
}

export default RepoItem;
