import {Mongo} from 'meteor/mongo';

export const Posts = new Mongo.Collection('posts');
export const Messages = new Mongo.Collection('messages');
export const Comments = new Mongo.Collection('comments');
export const Videos = new Mongo.Collection('videos');
export const Nominations = new Mongo.Collection('nominations');
export const Likes = new Mongo.Collection('likes');
