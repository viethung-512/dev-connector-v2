import React from 'react';
import { Card, Avatar, Typography, List, Button } from 'antd';
import {
  TwitterCircleFilled,
  FacebookFilled,
  LinkedinFilled,
  YoutubeFilled,
  InstagramFilled,
  EditOutlined,
} from '@ant-design/icons';
import { defaultImages } from '../../../../app/utils/config';

const { Title, Text } = Typography;

function HeaderContainer({
  profile: {
    user: { name, avatar },
    status,
    company,
    location,
    social,
  },
  isAuth,
  openUploadImageModal,
}) {
  return (
    <div>
      <Card
        className='profile-detailed__header-container'
        bodyStyle={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card.Meta
          className='profile-detailed__header-main'
          avatar={
            <div className='profile-detailed__header-avatar'>
              <Avatar
                size={220}
                src={avatar || defaultImages.USER}
                alt={name}
                className='avatar__image'
              />
              {isAuth && (
                <Button
                  type='primary'
                  shape='circle'
                  className='profile-detailed__edit-avatar-btn'
                  icon={<EditOutlined />}
                  onClick={openUploadImageModal}
                />
              )}
            </div>
          }
          title={
            <div className='profile-detailed__header-title'>
              <Title style={{ color: '#fff', marginBottom: 0 }}>{name}</Title>
            </div>
          }
          description={
            <div className='profile-detailed__header-description'>
              <Text>
                {status} {company && <span> at {company}</span>}
              </Text>

              <Text>{location}</Text>
            </div>
          }
        />
        <Card.Meta
          description={
            <div className='profile-detailed__header-socials'>
              {social && (
                <List>
                  {social.twitter && (
                    <a href={social.twitter}>
                      <Button
                        type='link'
                        icon={<TwitterCircleFilled style={{ color: '#fff' }} />}
                      />
                    </a>
                  )}

                  {social.facebook && (
                    <a href={social.facebook}>
                      <Button
                        type='link'
                        icon={<FacebookFilled style={{ color: '#fff' }} />}
                      />
                    </a>
                  )}
                  {social.linkedin && (
                    <a href={social.linkedin}>
                      <Button
                        type='link'
                        icon={<LinkedinFilled style={{ color: '#fff' }} />}
                      />
                    </a>
                  )}
                  {social.youtube && (
                    <a href={social.youtube}>
                      <Button
                        type='link'
                        icon={<YoutubeFilled style={{ color: '#fff' }} />}
                      />
                    </a>
                  )}
                  {social.instagram && (
                    <a href={social.instagram}>
                      <Button
                        type='link'
                        icon={<InstagramFilled style={{ color: '#fff' }} />}
                      />
                    </a>
                  )}
                </List>
              )}
            </div>
          }
        />
      </Card>
    </div>
  );
}

export default HeaderContainer;
