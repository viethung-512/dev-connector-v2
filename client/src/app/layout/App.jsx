import React, { useEffect } from 'react';
import './App.less';
import './style.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Layout } from 'antd';

import { setDefaultAxios } from '../utils/helper';
import ModalManager from '../../features/modal/ModalManger';
import DrawerManager from '../../features/drawer/DrawerManger';
import Toastr from './common/Toastr';
import Navbar from '../../features/navbar/Navbar';
import HomePage from '../../features/homepage/HomePage';
import { initUser } from '../../features/auth/auth.actions';
import { asyncActionClear } from '../../features/async/async.actions';
import Dashboard from '../../features/dashboard/Dashboard';
import PrivateRoute from './common/PrivateRoute';
import Developers from '../../features/profile/Developers/DevelopersPage';
import ProfileDetailed from '../../features/profile/ProfileDetailed/ProfileDetailed';
import PostPage from '../../features/post/post-component/PostPage';
import PostDetailed from '../../features/post/post-component/PostDetailed';
import ScrollToTop from './common/ScollToTop';

const { Content } = Layout;

setDefaultAxios();
const token = localStorage.getItem('token');

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncActionClear());
    if (token) {
      dispatch(initUser());
    }

    return () => {
      dispatch(asyncActionClear());
    };

    // eslint-disable-next-line
  }, [token]);
  return (
    <div className='app'>
      <ScrollToTop />
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
                <Switch>
                  <PrivateRoute exact path='/dashboard' component={Dashboard} />
                  <PrivateRoute
                    exact
                    path='/profile/me'
                    component={ProfileDetailed}
                  />
                  <PrivateRoute exact path='/posts' component={PostPage} />
                  <PrivateRoute
                    exact
                    path='/posts/:postId'
                    component={PostDetailed}
                  />
                  <Route exact path='/developers' component={Developers} />
                  <Route
                    exact
                    path='/profile/:userId'
                    component={ProfileDetailed}
                  />
                </Switch>
              </Content>
            </Layout>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
