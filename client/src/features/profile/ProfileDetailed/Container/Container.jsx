import React, { Fragment } from 'react';
import './style.css';
import { Card, List, Typography, Space, Row, Col } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import Experience from './Experience';
import Education from './Education';

const { Title, Text } = Typography;

function Container({ profile }) {
  return (
    <div className='profile-detailed__container'>
      {profile && (
        <Fragment>
          <Card
            bodyStyle={{ paddingTop: 0, paddingBottom: 0 }}
            style={{ marginBottom: 12 }}
          >
            <List>
              {profile && profile.bio && (
                <List.Item className='profile-detailed__container-item'>
                  <Title
                    level={3}
                    className='profile-detailed__container-title'
                  >
                    {profile.user.name}'s bio
                  </Title>
                  <Text>{profile.bio}</Text>
                </List.Item>
              )}
              <List.Item className='profile-detailed__container-item'>
                <Title level={3} className='profile-detailed__container-title'>
                  Skill Set
                </Title>
                {profile.skills && profile.skills.length > 0 ? (
                  <Space className='profile-detailed__container-skills'>
                    {profile.skills.map((skill, index) => (
                      <Text key={index}>
                        <CheckOutlined /> {skill}
                      </Text>
                    ))}
                  </Space>
                ) : (
                  <div>you don't have any skills</div>
                )}
              </List.Item>
            </List>
          </Card>

          <Row gutter={[12, 12]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Experience experience={profile.experience} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Education education={profile.education} />
            </Col>
          </Row>
        </Fragment>
      )}
    </div>
  );
}

export default Container;
