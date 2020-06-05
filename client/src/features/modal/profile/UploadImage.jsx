import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Upload, Button, Typography, Form, Space } from 'antd';
import ImgCrop from 'antd-img-crop';
import { closeModal } from '../modal.actions';
import { uploadProfileImage } from '../../profile/profile.actions';
import { UploadOutlined, LinkOutlined } from '@ant-design/icons';
import { actionTypes } from '../../../app/utils/config';

const { Text } = Typography;

const UploadImage = props => {
  const dispatch = useDispatch();
  const { loading, type } = useSelector(state => state.async);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const { profile: profileAction } = actionTypes;

  const handleCancel = () => dispatch(closeModal());

  const customRequest = () => {};

  const handleChangeImage = e => {
    setImage(e.file);
    setError(null);
  };

  const handleUpload = () => {
    if (!image) {
      setError({ image: { msg: 'Please choose an image to upload' } });
    } else {
      dispatch(uploadProfileImage(image));
    }
  };

  const uploadLoading =
    type === profileAction.UPLOAD_PROFILE_IMAGE ? loading : false;

  return (
    <Modal
      visible={true}
      onCancel={handleCancel}
      footer={null}
      title='Choose your profile image'
      destroyOnClose={true}
    >
      <Form>
        <Form.Item>
          <ImgCrop rotate modalTitle='Your Profile Image'>
            <Upload
              customRequest={customRequest}
              multiple={false}
              listType='picture-card'
              onChange={handleChangeImage}
              disabled={image}
            >
              <UploadOutlined />
            </Upload>
          </ImgCrop>
        </Form.Item>
        {image && image.name && (
          <Form.Item>
            <LinkOutlined style={{ marginRight: 12 }} />
            <Text>{image.name}</Text>
          </Form.Item>
        )}
        {error && error.image && (
          <Form.Item>
            <Text type='danger'>{error.image.msg}</Text>
          </Form.Item>
        )}

        <Form.Item>
          <Space>
            <Button
              type='primary'
              onClick={handleUpload}
              loading={uploadLoading}
              className='btn btn--dark'
            >
              Submit
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UploadImage;
