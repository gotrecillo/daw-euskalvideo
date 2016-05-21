import { Accounts } from 'meteor/accounts-base';

export default () => {
  Accounts.config({
    forbidClientAccountCreation: true
  });
};
