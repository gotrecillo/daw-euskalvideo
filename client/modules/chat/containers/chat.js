import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Component from '../components/chat';
import Spinner from '../../core/components/spinner';

export const composer = ({context, clearErrors}, onData) => {
  const { Meteor, Collections } = context();

  Meteor.subscribe('messages.list', () => {
    console.log('subscribed');
    const messages = Collections.Messages.find().fetch() || [];
    onData(null, {messages});
  });

  onData(null, {messages: []});
};

export const depsMapper = (context) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer, Spinner),
  useDeps(depsMapper)
)(Component);
