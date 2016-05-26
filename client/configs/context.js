import * as Collections from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Accounts} from 'meteor/accounts-base';
import {Tracker} from 'meteor/tracker';
import {Roles} from 'meteor/alanning:roles';
import Youtube from './youtube';

export default function () {
  return {
    LocalState: new ReactiveDict(),
    Meteor,
    FlowRouter,
    Collections,
    Tracker,
    Roles,
    Youtube,
    Accounts,
  };
}
