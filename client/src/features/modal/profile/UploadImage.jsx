import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import { closeModal, openModal } from '../modal.actions';
import UploadProfileImage from '../../profile/ProfileDetailed/UploadProfileImage';

const UploadImage = props => {
  const dispatch = useDispatch();

  const handleCancel = () => dispatch(closeModal());

  const handleOpenImageLibrary = () => dispatch(openModal('LibImageModal'));

  return (
    <Modal
      visible={true}
      onCancel={handleCancel}
      footer={null}
      title='Profile image'
      destroyOnClose={true}
    >
      <UploadProfileImage
        handleCancel={handleCancel}
        handleOpenImageLibrary={handleOpenImageLibrary}
      />
    </Modal>
  );
};

export default UploadImage;
