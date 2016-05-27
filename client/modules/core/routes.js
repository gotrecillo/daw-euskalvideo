import React from 'react';
import {mount} from 'react-mounter';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MainLayout from './components/main_layout';
import HomeLayout from './components/home_layout';
import Login from '../users/containers/login';
import Post from './containers/post';
import NewPost from './containers/newpost';
import NominationsList from '../videos/containers/nominations_list';
import VideoSearcher from '../videos/containers/video_searcher';
import Dashboard from '../dashboard/containers/dashboard';
import Home from '../home/containers/home';
import Profile from '../users/containers/profile';
import Chat from '../chat/containers/chat';

export default function (injectDeps, {FlowRouter, Meteor}) {
  const MainLayoutCtx = injectDeps(MainLayout);
  const HomeLayoutCtx = injectDeps(HomeLayout);

  FlowRouter.route('/', {
    name: 'home',
    action() {
      mount(HomeLayoutCtx, {
        content: () => (<Home />)
      });
    }
  });

  FlowRouter.route('/login', {
    name: 'users.login',
    triggersEnter: [ function (context, redirect) {
      if (Meteor.userId()) {
        redirect('/app');
      }
    } ],
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Login />)
      });
    }
  });

  const appRoutes = FlowRouter.group({
    prefix: '/app',
    name: 'app',
    triggersEnter: [ function (context, redirect) {
      if (!Meteor.userId()) {
        redirect('/login');
      }
    } ],
  });

  appRoutes.route('/', {
    name: 'app',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Dashboard />)
      });
    }
  });

  appRoutes.route('/nominations', {
    name: 'nominations',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<NominationsList />)
      });
    }
  });

  appRoutes.route('/nominate', {
    name: 'nominate',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<VideoSearcher />)
      });
    }
  });

  appRoutes.route('/profile', {
    name: 'profile',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Profile />)
      });
    }
  });

  appRoutes.route('/chat', {
    name: 'chat',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<Chat />)
      });
    }
  });

  FlowRouter.route('/post/:postId', {
    name: 'posts.single',
    action({postId}) {
      mount(MainLayoutCtx, {
        content: () => (<Post postId={postId}/>)
      });
    }
  });

  FlowRouter.route('/new-post', {
    name: 'newpost',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<NewPost/>)
      });
    }
  });
}
