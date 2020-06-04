import React from 'react';
import './App.less';
import './style.css';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import ModalManager from '../../features/modal/ModalManger';
import DrawerManager from '../../features/drawer/DrawerManger';
import Toastr from './common/Toastr';
import Navbar from '../../features/navbar/Navbar';
import HomePage from '../../features/homepage/HomePage';

const { Content } = Layout;

const App = () => (
  <div className='app'>
    <ModalManager />
    <DrawerManager />
    <Toastr />
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route
        render={() => (
          <Layout>
            <Navbar />
            <Content className='app-content'>
              <h1>App Dev connector</h1>
            </Content>
          </Layout>
        )}
      />
    </Switch>
  </div>
);

export default App;
