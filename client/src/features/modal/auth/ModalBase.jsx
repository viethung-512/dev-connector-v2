import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Typography } from 'antd';
import { closeModal } from '../modal.actions';

const { Title } = Typography;

function ModalLogin({ title, children }) {
  const dispatch = useDispatch();

  const handleCancel = () => dispatch(closeModal());

  return (
    <Modal
      width={350}
      visible={true}
      onCancel={handleCancel}
      title={
        <Title level={3} type='secondary' style={{ marginBottom: 0 }}>
          {title}
        </Title>
      }
      footer={null}
    >
      {children}
    </Modal>
  );
}

export default ModalLogin;
