import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography } from 'antd';

const RelatedArticleItem = ({ article }) => {
  return (
    <Card
      bordered={true}
      hoverable
      cover={<img src={article.mainPhoto} alt={article.title} />}
      bodyStyle={{ paddingLeft: 8, paddingRight: 8 }}
      style={{ maxWidth: 200 }}
    >
      <Card.Meta
        title={
          <Link to={`/blog/${article._id}`}>
            <Typography.Text>{article.title}</Typography.Text>
          </Link>
        }
        description={article.shortDescription}
      />
    </Card>
  );
};

export default RelatedArticleItem;
