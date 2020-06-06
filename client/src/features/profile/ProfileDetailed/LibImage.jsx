import React, { Fragment } from 'react';
import { Card, Button, Divider, List } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { actionTypes } from '../../../app/utils/config';

const LibImage = ({
  handleCancel,
  handleOpenUploadImage,
  photos,
  changeAvatar,
  loading,
  loadingType,
  elmId,
}) => {
  const { profile: profileAction } = actionTypes;

  return (
    <Card bordered={false} bodyStyle={{ padding: 0 }}>
      <Card.Meta
        title='Choose from your library'
        description={
          <Fragment>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 3,
              }}
              dataSource={photos || []}
              renderItem={item => (
                <List.Item>
                  <Card
                    cover={<img src={item.url} alt='profile' />}
                    actions={[
                      <Button
                        className='btn btn--success'
                        type='primary'
                        icon={<CheckOutlined />}
                        style={{ width: '100%' }}
                        loading={
                          loadingType === profileAction.CHANGE_PROFILE_IMAGE &&
                          elmId === item._id
                            ? loading
                            : false
                        }
                        onClick={() => changeAvatar(item._id)}
                      >
                        Avatar
                      </Button>,
                    ]}
                    bodyStyle={{ padding: 0 }}
                  />
                </List.Item>
              )}
            />
          </Fragment>
        }
      />
      <Divider>
        Or{' '}
        <Button type='link' onClick={handleOpenUploadImage}>
          Upload new profile image
        </Button>
      </Divider>
    </Card>
  );
};

export default LibImage;
