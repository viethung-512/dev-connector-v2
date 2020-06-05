import React from 'react';
import { List, Typography } from 'antd';
import RepoItem from './RepoItem';
import { GithubFilled } from '@ant-design/icons';

const { Title } = Typography;

function GithubRepos({ repos }) {
  return (
    <List
      style={{ marginTop: 12 }}
      header={
        <Title level={3} className='github-repos__title'>
          <GithubFilled className='github-repos__title-icon' /> Github Repos
        </Title>
      }
      dataSource={repos}
      renderItem={repo => (
        <List.Item>
          <RepoItem repo={repo} />
        </List.Item>
      )}
    />
  );
}

export default GithubRepos;
