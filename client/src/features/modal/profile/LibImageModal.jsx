import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import { closeModal, openModal } from '../modal.actions';
import LibImage from '../../profile/ProfileDetailed/LibImage';
import { changeProfileImage } from '../../profile/profile.actions';

const LibImageModal = props => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile.current);
  const { loading, type, elmId } = useSelector(state => state.async);

  const handleCancel = () => dispatch(closeModal());
  const handleOpenUploadImage = () => dispatch(openModal('UploadProfileImage'));

  const handleChangeAvatar = id => dispatch(changeProfileImage(id));

  const photos = profile ? profile.photos : [];

  return (
    <Modal
      visible={true}
      onCancel={handleCancel}
      footer={null}
      title='Profile image'
      destroyOnClose={true}
    >
      <LibImage
        handleCancel={handleCancel}
        handleOpenUploadImage={handleOpenUploadImage}
        photos={photos}
        changeAvatar={handleChangeAvatar}
        loading={loading}
        loadingType={type}
        elmId={elmId}
      />
    </Modal>
  );
};

export default LibImageModal;
