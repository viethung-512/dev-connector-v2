import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { Typography, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

function HomePage(props) {
  return (
    <div className='homepage'>
      <div className='overlay'>
        <Title className='homepage__title' level={1}>
          Developer Connector
        </Title>
        <Text className='homepage__description'>
          Create a developer profile/portfolio, share posts and get help from
          other developers
        </Text>
        <Link to='/dashboard'>
          <Button
            className='homepage__button'
            type='primary'
            size='large'
            icon={<ArrowRightOutlined />}
          >
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
