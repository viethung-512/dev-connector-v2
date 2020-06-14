import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { Typography, Card } from 'antd';
import Avatar from '../../app/layout/common/Avatar';

const { Title } = Typography;

function AuthorSidebar({ author, isAuth }) {
  return (
    <Card
      hoverable
      className='article-detailed__sidebar'
      bodyStyle={{ padding: 16 }}
    >
      <Card.Meta
        style={{ flexDirection: 'column', display: 'flex' }}
        description={
          <div className='article-detailed__sidebar-main'>
            <div className='article-detailed__sidebar-avatar'>
              <Avatar size={120} alt={author.name} src={author.avatar} />
            </div>
            <div className='article-detailed__sidebar-name'>
              <Link to={isAuth ? '/profile/me' : `/profile/${author._id}`}>
                <Title level={4} className='primary'>
                  {author.name}
                </Title>
              </Link>
            </div>
          </div>
        }
      />
    </Card>
  );
}

export default AuthorSidebar;
