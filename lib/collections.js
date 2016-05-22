import {Mongo} from 'meteor/mongo';

export const Posts = new Mongo.Collection('posts');
export const Comments = new Mongo.Collection('comments');
export const Videos = new Mongo.Collection('videos');
export const Nominations = new Mongo.Collection('nominations');
