import React from 'react';
import { List } from 'antd';
import ArticleItem from './ArticleItem';

function ArticleList({ articles }) {
  return (
    <List
      bordered={false}
      dataSource={articles}
      renderItem={article => (
        <List.Item>
          <ArticleItem article={article} />
        </List.Item>
      )}
    />
  );
}

export default ArticleList;
