import React from 'react';
import { useSelector } from 'react-redux';
import MenuMobileDrawer from './navbar/MenuMobileDrawer';
import ProfileActionDrawer from './profile/ProfileAction';
import EducationActionDrawer from './profile/EducationAction';
import ExperienceActionDrawer from './profile/ExperienceAction';

const drawerLookup = {
  MenuMobile: MenuMobileDrawer,
  ProfileAction: ProfileActionDrawer,
  EducationAction: EducationActionDrawer,
  ExperienceAction: ExperienceActionDrawer,
};

function DrawerManger(props) {
  const currentDrawer = useSelector(state => state.drawer);
  let renderDrawer;

  if (currentDrawer) {
    const { drawerType, drawerProps } = currentDrawer;
    const DrawerComponent = drawerLookup[drawerType];

    renderDrawer = <DrawerComponent {...drawerProps} />;
  }
  return <span>{renderDrawer}</span>;
}

export default DrawerManger;
