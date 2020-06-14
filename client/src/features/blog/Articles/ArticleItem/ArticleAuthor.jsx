import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Menu, Typography } from 'antd';
import { ProfileOutlined, InfoOutlined } from '@ant-design/icons';
import Avatar from '../../../../app/layout/common/Avatar';

const { Text } = Typography;

const ArticleAuthor = ({ author, isAuth }) => {
  const useMenu = (
    <Menu mode='vertical'>
      <Menu.Item key='author-name' icon={<InfoOutlined />} disabled={true}>
        {author.name}
      </Menu.Item>
      <Menu.Item key='author-profile' icon={<ProfileOutlined />}>
        <Link to={isAuth ? '/profile/me' : `/profile/${author._id}`}>
          <Text>View Profile</Text>
        </Link>
      </Menu.Item>
      <Menu.Item key='author-posts' icon={<InfoOutlined />}>
        <Link to={isAuth ? '/blog/me' : `/blog/user/${author._id}`}>
          <Text>View Posts</Text>
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={useMenu} trigger={['click', 'hover']}>
      <span className='auth-menu'>
        <Avatar
          src={author.avatar}
          alt={author.name}
          className='avatar--header avatar__image'
        />
      </span>
    </Dropdown>
  );
};

export default ArticleAuthor;
