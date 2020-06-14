import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR,
  ASYNC_ACTION_CLEAR,
} from './async.constants';

export const asyncActionStart = (actionType, elmId) => ({
  type: ASYNC_ACTION_START,
  payload: { actionType, elmId },
});

export const asyncActionFinish = () => ({
  type: ASYNC_ACTION_FINISH,
});

export const asyncActionError = err => ({
  type: ASYNC_ACTION_ERROR,
  payload: { err },
});

export const asyncActionClear = () => ({ type: ASYNC_ACTION_CLEAR });
