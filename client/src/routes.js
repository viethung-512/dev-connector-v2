import React from 'react';
import { Route } from 'react-router-dom';

import { pageTypes, routeTypes } from './app/utils/config';
import Dashboard from './features/dashboard/Dashboard';
import ProfileDetailed from './features/profile/ProfileDetailed/ProfileDetailed';
import PostPage from './features/post/post-component/PostPage';
import PostDetailed from './features/post/post-component/PostDetailed';
import ArticlesPage from './features/blog/Articles/ArticlesPage';
import ArticleDetailedPage from './features/blog/ArticleDetailed/ArticleDetailedPage';
import DevelopersPage from './features/profile/Developers/DevelopersPage';
import PrivateRoute from './app/layout/common/PrivateRoute';
import ArticleAction from './features/blog/ArticleAction/ArticleAction';

const articlePageTypes = pageTypes.article;

const routes = [
  {
    type: routeTypes.PRIVATE,
    exact: true,
    path: '/dashboard',
    component: () => <Dashboard />,
  },
  {
    type: routeTypes.PRIVATE,
    exact: true,
    path: '/profile/me',
    component: () => <ProfileDetailed />,
  },
  {
    type: routeTypes.PUBLIC,
    exact: true,
    path: '/profile/:userId',
    component: () => <ProfileDetailed />,
  },
  {
    type: routeTypes.PRIVATE,
    exact: true,
    path: '/posts',
    component: () => <PostPage />,
  },
  {
    type: routeTypes.PRIVATE,
    exact: true,
    path: '/posts/:postId',
    component: () => <PostDetailed />,
  },
  {
    type: routeTypes.PUBLIC,
    exact: true,
    path: '/blog',
    component: () => <ArticlesPage pageType={articlePageTypes.ALL} />,
  },

  {
    type: routeTypes.PUBLIC,
    exact: true,
    path: '/blog/user/:userId',
    component: () => <ArticlesPage pageType={articlePageTypes.USER} />,
  },
  {
    type: routeTypes.PRIVATE,
    exact: true,
    path: '/blog/me',
    component: () => <ArticlesPage pageType={articlePageTypes.AUTH} />,
  },
  {
    type: routeTypes.PRIVATE,
    exact: true,
    path: ['/blog/create', '/blog/edit/:articleId'],
    component: () => <ArticleAction />,
  },
  {
    type: routeTypes.PUBLIC,
    exact: true,
    path: '/blog/:articleId',
    component: () => <ArticleDetailedPage />,
  },

  {
    type: routeTypes.PUBLIC,
    exact: true,
    path: '/developers',
    component: () => <DevelopersPage />,
  },
];

const renderMenuItem = () => {
  return routes.map(route =>
    route.type === routeTypes.PRIVATE ? (
      <PrivateRoute
        key={route.path}
        exact={route.exact}
        path={route.path}
        component={route.component}
      />
    ) : (
      <Route
        key={route.path}
        exact={route.exact}
        path={route.path}
        component={route.component}
      />
    )
  );
};

export default renderMenuItem;
