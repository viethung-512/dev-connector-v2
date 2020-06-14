import React from 'react';
import { useSelector } from 'react-redux';
import ModalLogin from './auth/ModalLogin';
import ModalRegister from './auth/ModalRegister';
import UnAuthModal from './auth/UnAuthModal';
import UploadImage from './profile/UploadImage';
import LibImage from './profile/LibImageModal';

const modalLookup = {
  Login: ModalLogin,
  Register: ModalRegister,
  UploadProfileImage: UploadImage,
  LibImageModal: LibImage,
  UnAuth: UnAuthModal,
};

function ModalManger(props) {
  const currentModal = useSelector(state => state.modal);
  let renderModal;

  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];

    renderModal = <ModalComponent {...modalProps} />;
  }

  return <span>{renderModal}</span>;
}

export default ModalManger;
