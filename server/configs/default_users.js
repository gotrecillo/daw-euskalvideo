import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

const users = [
  { email: 'sergio.panadero.perez@gmail.com', username: 'gotre', name: 'gotre', roles: [ 'admin' ] },
  { email: 'homer@simpson.com', username: 'homer', name: 'homer', roles: [] },
  { email: 'bart@simpson.com', username: 'bart', name: 'bart', roles: [] },
];


export default () => {
  if (Meteor.users.find().count() === 0) {
    users.forEach(user => {
      const { username, name, email, roles } = user;
      const id = Accounts.createUser({
        password: 'euskal',
        profile: {username, name},
        email,
      });
      if (user.roles.length > 0) {
        Roles.addUsersToRoles(id, roles, 'admin');
      }
    });
  }
};
