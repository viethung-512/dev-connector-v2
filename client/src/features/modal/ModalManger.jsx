import React from 'react';
import { useSelector } from 'react-redux';
import ModalLogin from './auth/ModalLogin';
import ModalRegister from './auth/ModalRegister';
import UploadImage from './profile/UploadImage';

const modalLookup = {
  Login: ModalLogin,
  Register: ModalRegister,
  UploadProfileImage: UploadImage,
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
