import { OPEN_MODAL, CLOSE_MODAL } from './modal.constants';

export const openModal = (modalType, modalProps) => ({
  type: OPEN_MODAL,
  payload: { modalType, modalProps },
});

export const closeModal = () => ({ type: CLOSE_MODAL });
