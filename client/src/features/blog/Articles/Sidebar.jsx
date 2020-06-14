import React from 'react';
import { Link } from 'react-router-dom';
import { List, Card, Typography } from 'antd';

const { Text, Title } = Typography;

function Sidebar({ mostViewArticles }) {
  return (
    <List
      itemLayout='vertical'
      header={
        <Title style={{ marginBottom: 0 }} className='primary' level={4}>
          Most view
        </Title>
      }
      bordered={true}
      dataSource={mostViewArticles}
      renderItem={article => (
        <List.Item style={{ padding: 0 }}>
          <Card
            bordered={false}
            bodyStyle={{
              paddingLeft: 12,
              paddingRight: 12,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Card.Meta
              description={
                <Link to={`/blog/${article._id}`}>
                  <Text>{article.title}</Text>
                </Link>
              }
              style={{ width: '68%' }}
            />
            <Card.Meta
              style={{ width: '28%' }}
              description={
                <img
                  alt={article.title}
                  src={article.mainPhoto}
                  style={{ width: '100%' }}
                />
              }
            />
          </Card>
        </List.Item>
      )}
    />
  );
}

export default Sidebar;
