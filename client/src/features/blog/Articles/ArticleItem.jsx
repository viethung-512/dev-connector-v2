import React from 'react';
import { Card, Typography, Space, Button } from 'antd';
import {
  LikeOutlined,
  DislikeOutlined,
  CommentOutlined,
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

function ArticleItem({ article }) {
  return (
    <Card bordered hoverable>
      <Card.Meta
        avatar={
          <div className='article-item__img'>
            <img alt='article' src={article.mainPhoto} />
          </div>
        }
        title={<Title level={4}>{article.title}</Title>}
        description={
          <div className='article-item__content'>
            {article.description && (
              <Paragraph>{article.description}</Paragraph>
            )}
            <Space>
              <Button icon={<LikeOutlined />}>1</Button>
              <Button icon={<DislikeOutlined />}>2</Button>
              <Button icon={<CommentOutlined />}>3</Button>
            </Space>
          </div>
        }
      />
    </Card>
  );
}

export default ArticleItem;
