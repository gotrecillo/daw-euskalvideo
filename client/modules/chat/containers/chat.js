import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Component from '../components/chat';
import Spinner from '../../core/components/spinner';

export const composer = ({context, clearErrors}, onData) => {
  const { Meteor, Collections } = context();

  if (Meteor.subscribe('messages.list').ready()) {
    const messages = Collections.Messages.find({}, {sort: {createdAt: -1}}).fetch() || [];
    onData(null, {messages});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  createMessage: actions.messages.createMessage,
  messages: [],
});

export default composeAll(
  composeWithTracker(composer, Spinner),
  useDeps(depsMapper)
)(Component);
