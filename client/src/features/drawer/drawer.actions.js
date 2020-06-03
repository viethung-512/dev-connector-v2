import { OPEN_DRAWER, CLOSE_DRAWER } from './drawer.constants';

export const openDrawer = (drawerType, drawerProps) => ({
  type: OPEN_DRAWER,
  payload: { drawerType, drawerProps },
});

export const closeDrawer = () => ({ type: CLOSE_DRAWER });
