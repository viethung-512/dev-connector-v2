import React from 'react';
import './App.less';
import './style.css';
import { Layout } from 'antd';

import ModalManager from '../../features/modal/ModalManger';
import DrawerManager from '../../features/drawer/DrawerManger';
import Toastr from './common/Toastr';
import Navbar from '../../features/navbar/Navbar';

const { Content } = Layout;

const App = () => (
  <div className='app'>
    <ModalManager />
    <DrawerManager />
    <Toastr />
    <Layout>
      <Navbar />
      <Content className='app-content'>
        <h1>App Dev connector</h1>
      </Content>
    </Layout>
  </div>
);

export default App;
