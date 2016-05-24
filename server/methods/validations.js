import {check, Match} from 'meteor/check';

export const validNominationComment = Match.Where(function (x) {
  check(x, String);
  return x.length <= 140;
});
