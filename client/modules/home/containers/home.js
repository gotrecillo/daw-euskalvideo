import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Component from '../components/home';
import React from 'react';
import configs from '../configs';

const MyLoading = () => (<div>Hmm...</div>);

export const composer = ({context, clearErrors}, onData) => {
  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  features: configs.features,
  social: configs.social,
  navigate: actions.navigate.navigate,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer, MyLoading),
  useDeps(depsMapper)
)(Component);
