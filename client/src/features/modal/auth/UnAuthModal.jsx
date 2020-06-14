import React from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { Button, Divider, Typography } from 'antd';
import ModalBase from './ModalBase';
import { openModal, closeModal } from '../modal.actions';

const { Text } = Typography;

function UnAuthModal(props) {
  const dispatch = useDispatch();

  const openLoginModal = () => dispatch(openModal('Login'));
  const openRegisterModal = () => dispatch(openModal('Register'));
  const cancelModal = () => dispatch(closeModal());

  return (
    <ModalBase title='You need to be signed in!'>
      <div className='helper-text'>
        <Text>Please either login or register to see this page</Text>
      </div>
      <div className='actions-required'>
        <Button
          type='primary'
          className='actions-required-item actions-required-item--login btn btn--dark'
          onClick={openLoginModal}
        >
          Login
        </Button>
        <Button
          type='primary'
          className='actions-required-item actions-required-item--register btn btn--success'
          onClick={openRegisterModal}
        >
          Register
        </Button>
      </div>

      <Divider plain>Or click cancel to continue as a guest</Divider>
      <div className='actions-cancel'>
        <Button type='default' onClick={cancelModal}>
          Cancel
        </Button>
      </div>
    </ModalBase>
  );
}

export default UnAuthModal;
